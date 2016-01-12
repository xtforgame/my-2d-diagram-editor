(function() {

  'use strict';

  angular.module('ui.fabric')
    .service('fabricCanvas',
      function ($log, $rootScope, fabricService, fabricWindow) {

        var service = this;

        function createId() {
          return Math.floor(Math.random() * 10000);
        }

        service.setElement = function(element) {
          service.element = element;
          $rootScope.$broadcast('canvas:element:selected');
        };

        service.createCanvas = function(options) {

          options = options || angular.copy(fabricService.getCanvasDefaults());

          $log.info('options: ' + JSON.stringify(['e', options], null, '\t'));

          service.canvasId = 'fabric-canvas-' + createId();
          service.element.attr('id', service.canvasId);
          service.canvas = new fabricWindow.Canvas(service.canvasId, options);
          $rootScope.$broadcast('canvas:created');

          $log.info('service.element: ' + JSON.stringify(['e', service.element], null, '\t'));

          return service.canvas;
        };

        service.getCanvas = function() {
          return service.canvas;
        };

    });

})();

// { selection: false, width: 600, height: 600 }
// { width: 600, height: 600, backgroundColor: '#DCDCDC' }