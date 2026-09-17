import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { EspecialidadMedica } from '../generated/prisma/client'

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string

  @IsEnum(EspecialidadMedica, { message: 'La especialidad médica no es válida' })
  especialidadMedica: EspecialidadMedica

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  telefono: string

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email: string
}