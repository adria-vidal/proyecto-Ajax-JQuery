// Objeto con el array de juegos cargado.
var listadoJuegos;

/*
 * Función que se ejecuta cuando el DOM se ha cargado completamente
 */
$(() => {
  $.getJSON('../resources/juegos.json', function (data) {
    listadoJuegos = data;
    $(document).trigger('juegosCargados');
    $('.horizontal').attr('hidden', true);
    $('.form-check').children().remove();
    $('.input-group-mb-3').attr('hidden', true);
  });
});

/*
 * Evento que se lanza al acabar de cargar los juegos del fichero JSON
 */
$(document).on('juegosCargados', function () {
  console.log(listadoJuegos); // test

  $('.form-select').change((event) => {
    /** Si pulsamos sobre filtrar por genero.. */
    if ($(event.target).val() == 1) {
      $('.form-select option[value=1]').attr('hidden', true);
      $('.form-check').children().remove();
      let setGeneros = new Set();

      for (let game of listadoJuegos) setGeneros.add(game.genero);

      for (let genero of setGeneros) {
        let columna = $(
          "<div class='form-check-div'><input class='form-check-input' type='checkbox' value='" +
            genero +
            "'>" +
            "<label class='form-check-label' for='" +
            genero +
            "'>" +
            genero +
            '</label></div>'
        );
        $('.form-check').append(columna);
      }
      /** Si filtramos por año.. */
    } else if ($(event.target).val() == 2) {
      
      $('.form-check').children().remove();
      $('.input-group-mb-3').attr('hidden', false);
      $('.input-group-mb-3').attr("pattern", '[0-9]');
      $('.input-group-mb-3').keypress(function (e) { 
        if( e.charCode>= 97 && event.charCode <= 122){
         
         $('.input-group-mb-3').val.replaceWith(" ");
        }
        
      });
    }
  });

  
});
