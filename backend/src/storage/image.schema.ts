import { Schema } from 'mongoose';

export const ImageMongoName = 'Image';

export const ImageSchema = new Schema({
  name: String,
  url: String,
});
