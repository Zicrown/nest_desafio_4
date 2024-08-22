import { Document } from 'mongoose';

export interface Repuesto extends Document {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly imageURL: string;
  readonly createdAt: Date;
}
