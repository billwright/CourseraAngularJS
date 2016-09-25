(function () {
'use strict';

angular.module('DualShoppingListApp', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService() {
  var service = this;

  var needToBuyItems = [
  {
    name: "Rope",
    quantity: "1"
  },
  {
    name: "Harness",
    quantity: "2"
  },
  {
    name: "Cams",
    quantity: "10"
  },
  {
    name: "Slings",
    quantity: "12"
  },
  {
    name: "Carabiner",
    quantity: "25"
  },
];
  var boughtItems = [];

  service.buyItem = function (needToBuyItemIndex) {
    var item = needToBuyItems.splice(needToBuyItemIndex, 1);
    boughtItems.push(item[0]);
  }

  service.getNeedToBuyItems = function () {
    return needToBuyItems;
  }

  service.getBoughtItems = function () {
    return boughtItems;
  }
}

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getNeedToBuyItems();

  toBuyList.buyItem =  function(index) {
    ShoppingListCheckOffService.buyItem(index);
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
}

})();
