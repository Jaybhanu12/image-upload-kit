import express from 'express';
import multer from 'multer';
import path from 'path';
import { DiskService } from './storage/disk.service';
import { setupDatabase } from './storage/db.service';
import { ImageUploaderService } from './image-uploader/image-uploader.service';

export class ImageUploader {
  private service: ImageUploaderService | null = null;
  private singleUploader = multer({ dest: 'temp/' });
  private multiUploader = multer({ dest: 'temp/' });

  constructor(private readonly config: {
    uploadDir: string;
    db: {
      type: 'postgres' | 'mysql' | 'mongodb';
      host: string;
      port: number;
      username: string;
      password: string;
      database: string;
    };
  }) {}

  public async init(app: express.Express) {
    const staticPath = path.resolve(this.config.uploadDir);
    const disk = new DiskService(this.config.uploadDir);
    await disk.ensurePath();
    const db = await setupDatabase(this.config.db);
    this.service = new ImageUploaderService(disk, db, {
      baseUrl: '',
      uploadDir: this.config.uploadDir,
    });

    app.use('/uploads', express.static(staticPath));

    app.post('/upload', this.singleUploader.single('file'), async (req, res): Promise<void> => {
      try {
        if (!req.file) {
          res.status(400).json({ error: 'No file uploaded' });
          return;
        }

        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;

        this.service!.updateBaseUrl?.(baseUrl);
        const result = await this.service!.uploadImage(req.file);
        res.json(result);
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    app.post('/upload/many', this.multiUploader.array('files'), async (req, res): Promise<void> => {
      try {
        if (!req.files || !Array.isArray(req.files)) {
          res.status(400).json({ error: 'No files uploaded' });
          return;
        }

        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;

        this.service!.updateBaseUrl?.(baseUrl);
        const result = await this.service!.uploadMultipleImages(req.files);
        res.json(result);
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });
  }

  public async upload(req: express.Request) {
    const service = await this.ensureReady();
    return service.uploadImage(req.file!);
  }

  private async ensureReady() {
    if (!this.service) throw new Error('Uploader not initialized');
    return this.service;
  }
}
