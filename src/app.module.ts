import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RepuestosModule } from './repuestos/repuestos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosGuard } from './usuarios/usuarios.guard';
import { RolesGuard } from './usuarios/roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `${process.env.MONGO_URL}` /* || 'mongodb://localhost:27017/desafio4' */,
    ),
    RepuestosModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: UsuariosGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
