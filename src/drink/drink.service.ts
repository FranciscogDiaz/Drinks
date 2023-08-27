import { Injectable } from '@nestjs/common';
import { Drink } from './drink.interface';
const BASE_URL = 'http://localhost:3002/drinks'; // definimos la url de nuestra data base en el json server el /drinks lo obtenemos del nombre de nuestro objeto en la db.json
@Injectable()
export class DrinkService {
  async getData() {
    const res = await fetch(BASE_URL); // hacemos un fetch a nuestro json server para traernos los datos
    const newRes = await res.json(); // una vez tenemos la informacion los convertimos a json
    return newRes; // retornamos la informacion al controlador
  }
  async getDrinkById(id: number) {
    //Aclaramos que el id a recibir sera un numero
    const res = await fetch(BASE_URL); // hacemos un fetch a nuestro json server para traernos los datos
    const newRes = await res.json(); // una vez tenemos la informacion los convertimos a json
    const drinkToSend = newRes.find((drink: Drink) => drink.id == id); //Buscamos en la base de datos la bebida que tenga ese mismo id
    if (!drinkToSend) return 'No se encontraron bebidas con ese id'; // En el caso de no encontrar ninguna retornamos este mensaje (early return)
    return drinkToSend; // En el caso que lo encontremos lo retornamos
  }
  async addDrink(drink: Drink) {
    //Aclaramos que la bebida a recibir tendra los campos definidos en nuestra interface Drink
    const allDrinks = await fetch(BASE_URL).then((res) => res.json()); // hacemos un fetch a nuestro json server para traernos los datos
    const newId = allDrinks[allDrinks.length - 1].id + 1; // Creamos un nuevo id a partir del ultimo registro al que le sumamos 1
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: newId, ...drink }), // convertimos a string la copia de la bebida enviada y le agregamos nuestro nuevo id
    }); //Enviamos una peticion POST para crear una nueva bebida
    if (!res) return { message: 'drink not added, try again later', code: 401 }; // Si hubo un problema retornamos un mensaje de error
    return { message: 'drink added with success', code: 200 }; //En caso de exito retornamos este mensaje y podemos corroborarlo en nuestro archivo de database
  }
}
