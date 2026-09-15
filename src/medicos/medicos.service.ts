import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { EspecialidadMedica } from '../generated/prisma/client'

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.medico.findMany()
  }

  findOne(id: number) {
    return this.prisma.medico.findUnique({ where: { id } })
  }

  create(data: {
    nombre: string
    apellido: string
    especialidadMedica: EspecialidadMedica
    telefono: string
    email: string
  }) {
    return this.prisma.medico.create({ data })
  }

  update(id: number, data: Partial<{
    nombre: string
    apellido: string
    especialidadMedica: EspecialidadMedica
    telefono: string
    email: string
  }>) {
    return this.prisma.medico.update({ where: { id }, data })
  }

  remove(id: number) {
    return this.prisma.medico.delete({ where: { id } })
  }
}