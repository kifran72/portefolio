// initialisation de angular
const app = angular.module('messengerApp', ['luegg.directives', 'ngAnimate']);

app.config(['$qProvider', function($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});


app.directive('myEnter', function() {
  return function(scope, element, attrs) {
    element.bind('keydown keypress', function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.myEnter);
        });

        event.preventDefault();
      }
    });
  };
});

