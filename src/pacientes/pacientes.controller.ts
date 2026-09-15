import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common'
import { PacientesService } from './pacientes.service'

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  findAll() {
    return this.pacientesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const paciente = await this.pacientesService.findOne(Number(id))
    if (!paciente) {
      throw new NotFoundException(`No se encontró un paciente con id ${id}.`)
    }
    return paciente
  }

  @Post()
  create(@Body() body: any) {
    return this.pacientesService.create(body)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.pacientesService.update(Number(id), body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(Number(id))
  }
}