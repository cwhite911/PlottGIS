'use strict';

angular.module('plottGisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('map', {
        url: '/map/:state/:id',
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl'
      });
  });
