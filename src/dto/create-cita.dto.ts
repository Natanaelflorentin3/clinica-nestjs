import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsInt, IsOptional, IsEnum } from 'class-validator'
import { EstadoCita } from '../generated/prisma/client'

export class CreateCitaDto {
  @ApiProperty({ example: '2026-12-01T10:00:00.000Z' })
  @IsDateString()
  fecha: string

  @ApiProperty({ example: 1 })
  @IsInt()
  pacienteId: number

  @ApiProperty({ example: 1 })
  @IsInt()
  medicoId: number

  @ApiProperty({ example: 'PROGRAMADA', required: false })
  @IsOptional()
  @IsEnum(EstadoCita)
  estado?: EstadoCita
}