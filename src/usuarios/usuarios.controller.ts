import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Public } from 'src/decorators';
// import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Public()
  @Post('/register')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Public()
  @Post('/login')
  login(@Body() CreateUsuarioDto: CreateUsuarioDto) {
    const { correo, clave } = CreateUsuarioDto;
    return this.usuariosService.login(correo, clave);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }
}
