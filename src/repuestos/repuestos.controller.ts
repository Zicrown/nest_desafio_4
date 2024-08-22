import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { RepuestosService } from './repuestos.service';
import { CreateRepuestoDTO } from './dto/repuestos.dto';
import { Roles } from 'src/decorators';
import { Rol } from 'src/rol.enum';

@Controller('repuestos')
export class RepuestosController {
  constructor(private repuestosService: RepuestosService) {}

  // Ruta para Crear un Repuesto
  // Post Create
  @Roles(Rol.Admin)
  @Post('/create')
  async createRepuesto(@Res() res, @Body() repuestoCreated: CreateRepuestoDTO) {
    const repuesto =
      await this.repuestosService.createRepuesto(repuestoCreated);
    return res.status(HttpStatus.CREATED).json({
      message: 'Repuesto Creado Correctamente',
      repuesto,
    });
  }

  // Ruta para Obtener todos los Repuestos
  // Get All
  @Roles(Rol.Admin, Rol.Usuario)
  @Get('/')
  async getAllRepuestos(@Res() res) {
    const repuestos = await this.repuestosService.getRepuestos();
    return res.status(HttpStatus.OK).json({
      message: 'Todos los Repuestos',
      repuestos,
    });
  }

  // Ruta para Obtener un Repuesto
  // Get One
  @Roles(Rol.Admin, Rol.Usuario)
  @Get('/:id')
  async getRepuesto(@Res() res, @Param('id') id: string) {
    const repuesto = await this.repuestosService.getRepuesto(id);
    if (!repuesto)
      throw new NotFoundException('Repuesto Solicitado NO Encontrado');
    return res.status(HttpStatus.OK).json({
      message: 'Repuesto Encontrado',
      repuesto,
    });
  }

  // Ruta para Actualizar un Repuesto
  // Put Update
  @Roles(Rol.Admin)
  @Put('/update')
  async updateRepuesto(
    @Res() res,
    @Body() repuestoUpdated: CreateRepuestoDTO,
    @Query('id') repuestoID,
  ) {
    const repuesto = await this.repuestosService.updateRepuesto(
      repuestoID,
      repuestoUpdated,
    );
    if (!repuesto)
      throw new NotFoundException('Repuesto por Actualizar NO Encontrado');
    return res.status(HttpStatus.ACCEPTED).json({
      message: 'Repuesto Actualizado Correctamente',
      repuesto,
    });
  }

  // Ruta para Eliminar un Repuesto
  // Delete Delete
  @Roles(Rol.Admin)
  @Delete('/delete')
  async deleteRepuesto(@Res() res, @Query('id') id: string) {
    const repuesto = await this.repuestosService.deleteRepuesto(id);
    if (!repuesto)
      throw new NotFoundException('Repuesto por Eliminar NO Encontrado');
    return res.status(HttpStatus.OK).json({
      message: 'Repuesto Eliminado Correctamente',
      repuesto,
    });
  }
}
