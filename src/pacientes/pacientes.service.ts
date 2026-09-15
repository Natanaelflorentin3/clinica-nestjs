import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.paciente.findMany()
  }

  findOne(id: number) {
    return this.prisma.paciente.findUnique({ where: { id } })
  }

  create(data: {
    nombre: string
    apellido: string
    telefono: string
    email: string
    fechaNacimiento: Date
  }) {
    return this.prisma.paciente.create({ data })
  }

  update(id: number, data: Partial<{
    nombre: string
    apellido: string
    telefono: string
    email: string
    fechaNacimiento: Date
  }>) {
    return this.prisma.paciente.update({ where: { id }, data })
  }

  remove(id: number) {
    return this.prisma.paciente.delete({ where: { id } })
  }
}