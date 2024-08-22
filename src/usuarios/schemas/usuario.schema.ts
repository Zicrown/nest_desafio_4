import { Schema } from 'mongoose';

export const UsuarioSchema = new Schema({
  nombre: String,
  correo: { type: String, unique: true, required: true },
  clave: { type: String, required: true },
  roles: { type: String, required: true, default: 'client' },
  telefono: String,
  creadoEn: { type: Date, default: Date.now },
});
