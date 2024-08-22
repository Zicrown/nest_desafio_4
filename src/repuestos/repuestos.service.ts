import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Repuesto } from './interfaces/repuestos.interface';
import { CreateRepuestoDTO } from './dto/repuestos.dto';

@Injectable()
export class RepuestosService {
  constructor(
    @InjectModel('Repuesto') private readonly repuestoModel: Model<Repuesto>,
  ) {}

  // Método para crear un repuesto
  // Create
  async createRepuesto(repuestoToSave: CreateRepuestoDTO): Promise<Repuesto> {
    const newRepuesto = new this.repuestoModel(repuestoToSave);
    return await newRepuesto.save();
  }

  // Método para leer todos los repuestos
  // Read All
  async getRepuestos(): Promise<Repuesto[]> {
    const repuestos = await this.repuestoModel.find();
    return repuestos;
  }

  // Método para leer un repuesto
  // Read One
  async getRepuesto(id: string): Promise<Repuesto> {
    const repuesto = await this.repuestoModel.findById(id);
    return repuesto;
  }

  // Método para actualizar un repuesto
  // Update
  async updateRepuesto(
    id: string,
    repuestoToUpdate: CreateRepuestoDTO,
  ): Promise<Repuesto> {
    const repuesto = await this.repuestoModel.findByIdAndUpdate(
      id,
      repuestoToUpdate,
      { new: true },
    );
    return repuesto;
  }

  // Método para eliminar un repuesto
  // Delete
  async deleteRepuesto(id: string): Promise<Repuesto> {
    const repuesto = await this.repuestoModel.findByIdAndDelete(id);
    return repuesto;
  }
}
