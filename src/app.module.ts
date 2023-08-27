import { Module } from '@nestjs/common';
import { DrinkModule } from './drink/drink.module';

@Module({
  imports: [DrinkModule], // Nos traemos el modulo Drink que definimos dentro de la carpeta drink
  controllers: [],
  providers: [],
})
export class AppModule {}
