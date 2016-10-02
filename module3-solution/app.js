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
  console.log("Starting to run MenuSearchService function...");

  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    console.log("Running the getMatchedMenuItems function...");

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
  console.log("Done running MenuSearchService function");
}

console.log("After defining service...");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  console.log("Running the NarrowItDownController function...");
  var controller = this;

  controller.searchTerm = '';
  controller.searchForItems = function() {
    console.log("Running the searchForItems function on the NarrowItDownController...");
    console.log("Searching for term: " + controller.searchTerm);
    MenuSearchService.getMatchedMenuItems(controller.searchTerm).then(function(results) {
      console.log("results is ", results);
      controller.found = results;
    });
    console.log("controller.found is now: ", controller.found);
  }

  controller.removeItem = function(index) {
    console.log("found list is ", controller.found);
    controller.found.splice(index, 1);
    console.log("found list after splice is ", controller.found);
  }
  console.log("Done running the NarrowItDownController function...");
}

console.log("Just before running function...");
})();
