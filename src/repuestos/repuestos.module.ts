import { Module } from '@nestjs/common';
import { RepuestosService } from './repuestos.service';
import { RepuestosController } from './repuestos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RepuestosSchema } from './schemas/repuestos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Repuesto', schema: RepuestosSchema }]),
  ],
  providers: [RepuestosService],
  controllers: [RepuestosController],
})
export class RepuestosModule {}
