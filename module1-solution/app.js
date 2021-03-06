(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchList = '';

  $scope.checkLunch = function() {
    var parts = $scope.lunchList.split(',');

    // Only count non-item items. So '1,,2,,3' counts as just three items
    var nonEmptyItems = 0;
    for (let item of parts) {
      if (item.trim().length > 0) {
        nonEmptyItems++;
      }
    }
    $scope.messageColor = 'red';
    if (nonEmptyItems > 3) {
      $scope.message = 'Too much!';

    } else if (nonEmptyItems == 0) {
      $scope.message = "Please enter data first";
    } else {
      $scope.message = 'Eat up!';
      $scope.messageColor = 'green';
    }
  }
}

})();
