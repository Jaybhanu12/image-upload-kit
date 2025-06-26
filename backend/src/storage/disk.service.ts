import path from 'path';
import * as fs from 'fs/promises';

export class DiskService {
  constructor(private uploadDir: string) {}

  async ensurePath() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (err) {
      console.error('Failed to create uploadDir:', this.uploadDir, err);
      throw err;
    }
  }

  async save(file: Express.Multer.File, name: string): Promise<string> {
    const targetPath = path.join(this.uploadDir, name);
    await fs.rename(file.path, targetPath);
    return `/uploads/${name}`;
  }
}
