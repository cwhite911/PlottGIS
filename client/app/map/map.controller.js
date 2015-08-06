'use strict';

angular.module('plottGisApp')
  .controller('MapCtrl', function ($scope) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3R3aGl0ZSIsImEiOiItb0dqdUlZIn0.4Zb1DGESXnx0ePxMVLihZQ';
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'https://www.mapbox.com/mapbox-gl-styles/styles/satellite-v7.json', //stylesheet location
      center: [40, -74.50], // starting position
      zoom: 9 // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.Navigation());

  });
