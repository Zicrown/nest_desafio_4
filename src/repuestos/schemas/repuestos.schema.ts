import { Schema } from 'mongoose';

export const RepuestosSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: String,
  createdAt: { type: Date, default: Date.now },
});
