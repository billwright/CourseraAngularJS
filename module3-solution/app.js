(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    restrict: "E",
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    }
  };

  return ddo;
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {

  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {

    var responsePromise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return responsePromise.then(function (result) {
      // process result and only keep items that match
      var allItems = result.data.menu_items;
      console.log("Get returned " + allItems.length + " items");
      var matchedItems = allItems.filter(function (item) {
        return item.description.toLowerCase().indexOf(searchTerm) !== -1;
      });

      console.log("Filtered leaves " + matchedItems.length + " items");
      // return processed items
      return matchedItems;
    });
  }
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.searchTerm = '';
  controller.searchForItems = function() {
    console.log("Searching for term: " + controller.searchTerm);
    if (controller.searchTerm == '') {
      controller.found = [];
    } else {
      MenuSearchService.getMatchedMenuItems(controller.searchTerm).then(function(results) {
        controller.found = results;
      });
  }
  }

  controller.removeItem = function(index) {
    controller.found.splice(index, 1);
  }
}

})();
