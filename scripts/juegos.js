// Objeto con el array de juegos cargado.
//var listadoJuegos;

/**
 * Función que se ejecuta cuando el DOM se ha cargado completamente
 */

$(() => {
  $.getJSON('../resources/juegos.json', function (data) {
    listadoJuegos = data;
    $(document).trigger('juegosCargados');
  });
});

/**
 * Evento que se lanza al acabar de cargar los juegos del fichero JSON
 */

$(document).on('juegosCargados', function () {
  
  
  $('.horizontal').attr("hidden", true);

 if( $(".form-select option[value="+ 1 +"]").attr("selected",true)){
   
 }
});
