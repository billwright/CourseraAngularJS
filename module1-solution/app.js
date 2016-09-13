(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope']
function LunchCheckController($scope) {
  $scope.lunchList;

  $scope.checkLunch = function() {
    parts = $lunchList.split(',');
    if (parts > 3) {
      $scope.$message = 'Too much!'
    } else {
      $scope.$message = 'Eat up!'
    }
  }
}

})();
