(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.searchForItems = function() {
    console.log("Searching for term: " + controller.searchTerm);
    controller.found = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
  }
}

console.log("In ifft...");
})();

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  this.getMatchedMenuItems = function(searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response.then(function (result) {
    // process result and only keep items that match
    var allItems = result.data;
    var matchedItems = allItems;

    // return processed items
    return matchedItems;
    });
  }
}

console.log("In angular file...");
