import { Module } from '@nestjs/common';
import { DrinkController } from './drink.controller';
import { DrinkService } from './drink.service';

@Module({
  imports: [],
  controllers: [DrinkController], //Pasamos el controlador
  providers: [DrinkService], // Pasamos nuestro servicio
})
export class DrinkModule {}
