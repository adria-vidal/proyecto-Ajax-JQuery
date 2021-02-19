import { imprimirTabla } from './imprimirDatos.js';

/** Funcion para obtener la ubicacion y recoger
 * las ciudades a 20 KM de tu ubicacion
 */


$(() => {
 obtenerPueblosCercanos();
});

async function obtenerPueblosCercanos() {
  
  let ciudades = [];

  /** Obtenemos coordenadas (longitud, latitud) */
  let posicion = await obtenerCoordenadas();

  const link = `https://api.geodatasource.com/cities?key=INICBYMJ11BP9AIAK2WFDILYCMGGEUV2&format=json&lat=${posicion.coords.latitude}&lng=${posicion.coords.longitude}`;

  /** A partir de las coordenadas obtenidas
   *  obtendremos con el link de la api las ciudades a 20KM
   */

  let cercanos = await fetch(link);
  let jsonCercanos = await cercanos.json();
  /** Obtenemos la cantidad de ciudades cercanas hay */
  let tamañoJson = Object.keys(jsonCercanos).length;
  /** añadimos a nuestro array ciudades, todas las ciudades cercanas */
  for (let x = 0; x < tamañoJson; x++) {
    ciudades.push(jsonCercanos[x].city);
  }
  obtenerDatosCovid(ciudades);
}
/** funcion para obtener objeto para las coordenadas */
function obtenerCoordenadas() {
  return new Promise((resolve) =>
    navigator.geolocation.getCurrentPosition(resolve)
  );
}
/**
 * Funcion para obtener los datos proporcionados
 *  por la generalitat del Covid-19
 */
async function obtenerDatosCovid(ciudades) {
  const link2 = `https://dadesobertes.gva.es/api/3/action/package_search?q=id:38e6d3ac-fd77-413e-be72-aed7fa6f13c2`;
  let ciudadCovid = [];
  let pueblosGeneralitat = await fetch(link2);
  let jsonPueblos = await pueblosGeneralitat.json();

  let resources = jsonPueblos.result.results[0].resources;
  let urlObj = resources[resources.length - 1].url;
  let nameObj = resources[resources.length - 1].name;
  let ultimaFecha = nameObj.substring(nameObj.length - 10, nameObj.length);

  const datosCovid = await fetch(urlObj);

  let stringDatosCovid = await datosCovid.text();

  let arrayDatos = stringDatosCovid.split([';']);

  for (let i = 8; i < arrayDatos.length; i += 7) {
    let puebloGeneralitat = arrayDatos[i]
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    let datosPCR = arrayDatos[i + 3];
    let cienmilPCR = arrayDatos[i + 4];
    for (let x = 0; x < ciudades.length; x++) {
      if (ciudades[x] == puebloGeneralitat) {
        ciudadCovid.push(puebloGeneralitat, datosPCR, cienmilPCR);
      }
    }
  }
/** LLamamos a la funcion que imprime los datos
 * que se encuentra en imprimir.js
 */
  imprimirTabla(ciudadCovid, ultimaFecha);
}
export{
  obtenerPueblosCercanos,
}