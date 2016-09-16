(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchList;

  $scope.checkLunch = function() {
    var parts = $scope.lunchList.split(',');
    if (parts.length > 3) {
      $scope.message = 'Too much!';
    } else {
      $scope.message = 'Eat up!';
    }
  }
}

})();
