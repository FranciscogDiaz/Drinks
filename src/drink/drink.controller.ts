import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DrinkService } from './drink.service';
import { Drink } from './drink.interface';
@Controller('drinks') // asignamos el endpoint http://localhost:3000/drinks
export class DrinkController {
  constructor(private drinkService: DrinkService) {} // nos traemos el servicio y lo instanciamos (creamos una copia)

  @Get() // Definimos el metodo GET para TRAER informacion
  getData(): Promise<Drink[]> {
    //Aqui aclaramos que esta funcion retornara una promesa de un array con objetos de tipo Drink como nuestra interfaz
    return this.drinkService.getData(); // ejecutamos el metodo (funcion) getData dentro del servicio DrinkService
    // Nota: es necesario el this porque el servicio esta definido por fuera de esta funcion
  }
  @Get(':id') // Recibimos el id por parametro ejemplo: http://localhost:3000/drinks/2
  getDrinkById(@Param('id') id: number): Promise<Drink> {
    //Aqui aclaramos que esta funcion retornara una promesa de un objeto de tipo Drink como nuestra interfaz y que el id sera un numero
    return this.drinkService.getDrinkById(id); //ejecutamos el metodo (funcion) getDrinkById dentro del servicio DrinkService y le pasamos el id
  }
  @Post()
  addDrink(@Body() drink: Drink) {
    //Aqui aclaramos que esta funcion envia por Body una bebida de tipo Drink como nuestra interfaz
    return this.drinkService.addDrink(drink); //ejecutamos el metodo (funcion) addDrink dentro del servicio DrinkService y le pasamos la bebida del body
  }
}
