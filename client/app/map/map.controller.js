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

      //Debug
      // map.debug = true;
      // map.collisionDebug = true;

      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.Navigation());

      //On click get interment data
      map.on('click', function(e) {
       map.featuresAt(e.point, {radius: 10, layer: 'interments', type: 'vector'}, function(err, features) {
           if (err) throw err;
           if (Array.isArray(features) && features.length > 0){
            var latLng = new mapboxgl.LatLng(features[0].geometry.coordinates[1],features[0].geometry.coordinates[0]);
            map.panTo(latLng);
            $scope.clickFeature = features[0].properties;
            $scope.$apply();
            console.log($scope.clickFeature);
            var config = {
              params: {
                geojson: features[0].geometry
              }
            };
            $http.get('/api/interments/near', config)
              .success(function(nearGraves) {
                $scope.nearFeatures = nearGraves;
              });
          }
       });
      });
    }

      $http.get('/api/interments').success(function(graves) {
        $scope.graves = graves;
        console.log('GET Interment', graves);
        socket.syncUpdates('interments', $scope.graves);
        var intermentsSource = new mapboxgl.GeoJSONSource({
         data: $scope.graves,
         maxzoom: 22,
         buffer: 1
        });
        map.addSource('interments', intermentsSource); // add
        map.on('style.load', function() {
          map.addLayer({
           "id": "interments",
           "type": "symbol",
           "source": "interments",
           "interactive": true,
           "layout": {
             "icon-image": "cemetery-12",
             "icon-allow-overlap": true,
             "text-field": "{last_name}",
             "text-font": "Open Sans Semibold, Arial Unicode MS Bold",
             "text-offset": [0, 0.6],
             "text-anchor": "top"
           },
           "paint": {
             "text-size": 8,
             "text-color": "#fff",
             "icon-color": "#fff"
           }
         });
       });
       console.log(map);
     });


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
