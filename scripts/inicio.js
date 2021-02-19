'use strict';

/** Codigo para la seccion Juegos */
/** Evento para redirigir a la pagina Covid al pulsar boton */

$(() => {
  $('button#covid').click(() => {
    location.href = 'covid.html';
  });
});

/**
 * Evento pedir permiso al usuario
 */
$(() => {
  $('button#notificaciones').click(() => {
    let permiso = Notification.permission;
    Notification.requestPermission(function (permiso) {
      // Si el usuario nos lo concede, creamos la notificación
      if (permiso === 'granted') {
        return new Promise((resolve) =>
          setTimeout(() => {
            resolve = notificacion();
          }, 5000)
        );
      }
    });
  });
});

/** Funcion para mostrar notificación emergente */
function notificacion() {
  let notificacion = new Notification('Información', {
    body: 'Se ha publicado un video juego',
  });
  /** Evento para redirigir a la pantalla video al hacer click izq
   * sobre la pestaña emergente
   */

   $(notificacion).click(() => {
    location.href = 'juegos.html';
  });
  
}
