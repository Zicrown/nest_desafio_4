import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './interfaces/usuario.interface';
import * as bcript from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
    private jwtService: JwtService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const hashClave = await bcript.hash(createUsuarioDto.clave, 10);
      const nuevoUsuario = new this.usuarioModel({
        ...createUsuarioDto,
        clave: hashClave,
      });
      return await nuevoUsuario.save();
    } catch (error) {
      throw new HttpException('Datos Incorrectos', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async login(correo: string, clave: string) {
    try {
      const usuario = await this.usuarioModel.findOne({ correo });
      // console.log('Usuario Encontrado: ', usuario);
      const claveValida = await bcript.compare(clave, usuario.clave);
      // console.log('Validacion de Clave: ', claveValida);
      if (!claveValida)
        throw new HttpException('Clave incorrecta', HttpStatus.NOT_ACCEPTABLE);
      if (usuario && claveValida) {
        const payload = {
          sub: usuario.id,
          correo: usuario.correo,
          nombre: usuario.nombre,
          roles: usuario.roles,
        };
        // console.log('Data: ', payload);
        const resp = { access_token: await this.jwtService.signAsync(payload) };
        // console.log('Respuesta al token', resp);
        return resp;
      }
    } catch (error) {
      throw new HttpException(
        'Datos no encontrados o incorrectos',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }
}
