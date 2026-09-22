import { Controller, Get, Post, Body } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CitasService } from './citas.service'
import { CreateCitaDto } from '../dto/create-cita.dto'

@ApiTags('Citas')
@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @ApiOperation({ summary: 'Crea una nueva cita, validando que el paciente exista' })
  @Post()
  create(@Body() dto: CreateCitaDto) {
    return this.citasService.create(dto)
  }

  @ApiOperation({ summary: 'Lista todas las citas' })
  @Get()
  findAll() {
    return this.citasService.findAll()
  }
}