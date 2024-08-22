import { Document } from 'mongoose';

export interface Usuario extends Document {
  readonly nombre: string;
  readonly correo: string;
  readonly clave: string;
  readonly roles: string;
  readonly telefono: string;
}
