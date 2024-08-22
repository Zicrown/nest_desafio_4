import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './schemas/usuario.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsuarioController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
