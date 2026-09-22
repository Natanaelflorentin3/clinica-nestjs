import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PacientesService } from './pacientes.service'
import { CreatePacienteDto } from '../dto/create-paciente.dto'
import { UpdatePacienteDto } from '../dto/update-paciente.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'

@ApiTags('Pacientes')
@ApiBearerAuth()
@Controller('pacientes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPCIONISTA')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @ApiOperation({ summary: 'Lista todos los pacientes' })
  @Get()
  findAll() {
    return this.pacientesService.findAll()
  }

  @ApiOperation({ summary: 'Obtiene un paciente por su id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const paciente = await this.pacientesService.findOne(Number(id))
    if (!paciente) {
      throw new NotFoundException(`No se encontró un paciente con id ${id}.`)
    }
    return paciente
  }

  @ApiOperation({ summary: 'Crea un nuevo paciente' })
  @Post()
  create(@Body() dto: CreatePacienteDto) {
    return this.pacientesService.create(dto)
  }

  @ApiOperation({ summary: 'Actualiza un paciente existente' })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePacienteDto) {
    return this.pacientesService.update(Number(id), dto)
  }

  @ApiOperation({ summary: 'Elimina un paciente' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(Number(id))
  }
}