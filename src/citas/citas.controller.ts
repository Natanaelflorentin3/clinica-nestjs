import { Controller, Get, Post, Body } from '@nestjs/common'
import { CitasService } from './citas.service'

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  create(@Body() body: any) {
    return this.citasService.create(body)
  }

  @Get()
  findAll() {
    return this.citasService.findAll()
  }
}