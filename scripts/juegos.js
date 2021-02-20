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
  /** Aparece o desaparece texto del filtro con la cruz
   *  Aparece o desaparece texto en el desplegable
   * borramos filtros
   */
  $('.horizontal a[data-filtro=1]').click(function () {
    $('.horizontal:first-child').attr('hidden', true);
    $('.form-select option[value=1]').attr('hidden', false);
    $('.form-check').children().remove();
  });

  $('.horizontal a[data-filtro=2]').click(function () {
    $('.horizontal:last-child').attr('hidden', true);
    $('.form-select option[value=2]').attr('hidden', false);
    $('.input-group-mb-3').attr('hidden', true);
  });

  /** capturamos evento al cambiar de filtro y mostramos los generos */
  $('.form-select').change((event) => {
    /** Si pulsamos sobre filtrar por genero.. */
    if ($(event.target).val() == 1) {
      $('.form-select option[value=0]').prop('selected', true);
      $('.horizontal:first-child').attr('hidden', false);
      $('.form-select option[value=1]').attr('hidden', true);
      $('.form-check').children().remove();

      let setGeneros = new Set();
      for (let juego of listadoJuegos) setGeneros.add(juego.genero);

      for (let genero of setGeneros) {
        let col = $(
          "<div class='form-check-div'><input class='form-check-input' type='checkbox' value='" +
            genero +
            "'>" +
            "<label class='form-check-label' for='" +
            genero +
            "'>" +
            genero +
            '</label></div>'
        );
        $('.form-check').append(col);
      }
      /** Si filtramos por año.. */
    } else if ($(event.target).val() == 2) {
      $('.form-select option[value=0]').prop('selected', true);
      $('.horizontal:last-child').attr('hidden', false);
      $('.form-select option[value=2]').attr('hidden', true);
      $('.input-group-mb-3').attr('hidden', false);

      /**Evento para limitar la cantidad dee numeros e ignorar las letras */
      $('.input-group-mb-3').keyup(function (ev) {
        if (ev.target.value.length > 4) {
          ev.target.value = ev.target.value.slice(0, 4);
        } else if (
          (ev.which < 48 || ev.which > 57) &&
          (ev.which < 96 || ev.which > 105)
        ) {
          ev.target.value = ev.target.value.slice(
            0,
            ev.target.value.length - 1
          );
        }
      });
    }
  });
});
