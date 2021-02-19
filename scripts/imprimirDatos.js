function imprimirTabla(ciudadCovid, ultimaFecha) {

    $('p#cargando').remove();

    $('body div#container').append('Dia: ' + ultimaFecha);
    $('body div#container').append('<table>');
    $('table').append(
      '<thead><th>Municipio</th><th>Casos PCR+ (14 dias)</th><th>Casos PCR+ por 100.000</th></thead>'
    );
  
    for (let i = 0; i < ciudadCovid.length; i += 3) {
      let fila = $('table').append('<tr>');
      $('table').append(fila);
      $(fila).append('<td id="ciudad">' + ciudadCovid[i] + '</td>');
      $(fila).append('<td id="pcr">' + ciudadCovid[i + 1] + '</td>');
      $(fila).append('<td id="pcrcien">' + ciudadCovid[i + 2] + '</td>');
    }
  }
  export{
      imprimirTabla,
  }