import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PacientesService } from '../pacientes/pacientes.service'
import { EstadoCita } from '../generated/prisma/client'

@Injectable()
export class CitasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pacientesService: PacientesService
  ) {}

  async create(data: { fecha: Date; pacienteId: number; medicoId: number; estado?: EstadoCita }) {
    const paciente = await this.pacientesService.findOne(data.pacienteId)
    if (!paciente) throw new NotFoundException('El paciente no existe')

    return this.prisma.cita.create({ data })
  }

  findAll() {
    return this.prisma.cita.findMany()
  }
}