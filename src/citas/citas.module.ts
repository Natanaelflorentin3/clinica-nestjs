import { Module } from '@nestjs/common'
import { PacientesModule } from '../pacientes/pacientes.module'
import { CitasController } from './citas.controller'
import { CitasService } from './citas.service'

@Module({
  imports: [PacientesModule],
  controllers: [CitasController],
  providers: [CitasService]
})
export class CitasModule {}