// Objeto con el array de juegos cargado.
//var listadoJuegos;

/**
 * Función que se ejecuta cuando el DOM se ha cargado completamente
 */

$(() => {
  $.getJSON('../resources/juegos.json', function (data) {
    listadoJuegos = data;
    $(document).trigger('juegosCargados');
    console.log(listadoJuegos);
  });
});

/**
 * Evento que se lanza al acabar de cargar los juegos del fichero JSON
 */
$(() => {
  $('.horizontal').attr("hidden", true);
  $('.form-check').children().remove();
  });



$(document).on('juegosCargados', function () {
  
  
  

 if( $(".form-select option[value="+ 1 +"]").attr("selected",true)){

 }
});
