import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PacientesService } from '../pacientes/pacientes.service'
import { CreateCitaDto } from '../dto/create-cita.dto'

@Injectable()
export class CitasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pacientesService: PacientesService
  ) {}

  async create(dto: CreateCitaDto) {
    const paciente = await this.pacientesService.findOne(dto.pacienteId)
    if (!paciente) throw new NotFoundException('El paciente no existe')

    return this.prisma.cita.create({ data: dto })
  }

  findAll() {
    return this.prisma.cita.findMany()
  }
}