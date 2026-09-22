import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreatePacienteDto {
  @ApiProperty({ example: 'Sofia' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string

  @ApiProperty({ example: 'Torres' })
  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido: string

  @ApiProperty({ example: '3411234567' })
  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  telefono: string

  @ApiProperty({ example: 'sofia.torres@mail.com' })
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email: string

  @ApiProperty({ example: '1995-03-20T00:00:00.000Z' })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida' })
  fechaNacimiento: string
}