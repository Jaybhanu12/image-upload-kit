import { createConnection } from 'typeorm';
import mongoose from 'mongoose';
import { ImageEntity } from './entities/image.entity';
import { ImageMongoName, ImageSchema } from './image.schema';

export async function setupDatabase(config: any) {
  if (config.type === 'mongodb') {
    await mongoose.connect(`mongodb://${config.host}:${config.port}`, {
      dbName: config.database,
      user: config.username,
      pass: config.password,
    });

    const model = mongoose.model(ImageMongoName, ImageSchema);
    return {
      type: 'mongo',
      save: async (doc: any) => {
        const result = await model.create(doc);
        return { id: result._id, url: result.url };
      },
    };
  }

  const connection = await createConnection({
    type: config.type,
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    synchronize: true,
    entities: [ImageEntity],
  });

  const repo = connection.getRepository(ImageEntity);
  return {
    type: 'sql',
    save: async (doc: any) => {
      const result = await repo.save(doc);
      return { id: result.id, url: result.url };
    },
  };
}
