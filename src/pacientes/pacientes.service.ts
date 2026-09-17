import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePacienteDto } from '../dto/create-paciente.dto'
import { UpdatePacienteDto } from '../dto/update-paciente.dto'

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.paciente.findMany()
  }

  findOne(id: number) {
    return this.prisma.paciente.findUnique({ where: { id } })
  }

  create(dto: CreatePacienteDto) {
    if (new Date(dto.fechaNacimiento) > new Date()) {
      throw new BadRequestException('La fecha de nacimiento no puede ser futura')
    }
    return this.prisma.paciente.create({ data: dto })
  }

  update(id: number, dto: UpdatePacienteDto) {
    return this.prisma.paciente.update({ where: { id }, data: dto })
  }

  remove(id: number) {
    return this.prisma.paciente.delete({ where: { id } })
  }
}