import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import { DiskService } from '../storage/disk.service';

export class ImageUploaderService {
    constructor(
        private readonly disk: DiskService,
        private readonly db: { type: string; save: (doc: any) => Promise<any> },
        private readonly config: { baseUrl: string; uploadDir: string }
    ) { }

    async uploadImage(file: Express.Multer.File) {
        const uniqueName = `${uuidv4()}-${file.originalname}`;
        const relPath = await this.disk.save(file, uniqueName);
        const fullUrl = `${this.config.baseUrl}${relPath}`;
        try {
            await fs.unlink(file.path);
        } catch (err: any) {
            if (err.code !== 'ENOENT') throw err; // ignore "file not found" errors
        }

        return this.db.save({ name: file.originalname, url: fullUrl });
    }

    async updateBaseUrl(url: string) {
        this.config.baseUrl = url;
    }


    async uploadMultipleImages(files: Express.Multer.File[]) {
        const results = await Promise.all(
            files.map(async (file) => {
                const uniqueName = `${uuidv4()}-${file.originalname}`;
                const relPath = await this.disk.save(file, uniqueName);
                const fullUrl = `${this.config.baseUrl}${relPath}`;
                await fs.unlink(file.path); // cleanup temp file
                return this.db.save({ name: file.originalname, url: fullUrl });
            })
        );
        return results;
    }
}
