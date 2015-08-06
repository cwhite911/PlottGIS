'use strict';

angular.module('plottGisApp')
  .controller('MapCtrl', function ($scope, $http, socket) {
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3R3aGl0ZSIsImEiOiItb0dqdUlZIn0.4Zb1DGESXnx0ePxMVLihZQ';
    if (!mapboxgl.supported()) {
      alert('Your browser does not support Mapbox GL');
    } else {
      var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'https://www.mapbox.com/mapbox-gl-styles/styles/satellite-v7.json', //stylesheet location
        center: [35.600251, -82.570848], // starting position
        zoom: 17 // starting zoom
      });

      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.Navigation());

      $http.get('/api/interments').success(function(graves) {
        $scope.graves = graves;
        socket.syncUpdates('interments', $scope.graves);
        map.on('style.load', function() {
          map.addSource("markers", {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": $scope.graves
            }
          });
          map.addLayer({
           "id": "markers",
           "type": "symbol",
           "source": "markers",
           "layout": {
             "icon-image": "{marker-symbol}-12",
             "text-field": "{last_name}",
             "text-font": "Open Sans Semibold, Arial Unicode MS Bold",
             "text-offset": [0, 0.6],
             "text-anchor": "top"
           },
           "paint": {
             "text-size": 12
           }
         });
       });
     });
   }

    $scope.addThing = function() {
      if($scope.newGrave === '') {
        return;
      }
      $http.post('/api/interments', { name: $scope.newGrave });
      $scope.newGrave = '';
    };

    $scope.deleteThing = function(grave) {
      $http.delete('/api/interments/' + grave._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('interments');
    });

  });
