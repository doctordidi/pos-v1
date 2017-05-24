'use strict';
/**
 * Created by shuwei on 2017/5/23.
 */
//TODO: 请补完下面的函数以完成需求.
function   printReceipt(inputs) {
  var cartItems=buildCartItems(inputs);
  var receiptItems=buildReceiptItems(cartItems);
  var summer=summer(receiptItems);
  console.log(cartItems);

}

function buildCartItems(tags){

  var allItems = loadAllItems();
  var cartItems = [];
  var cartItems1 = {};

  for (var i = 0; i < tags.length;) {
    var count = 0;
    for (var j = i; j < tags.length; j++) {
      if (tags[j] === tags[i]) {
        count++;
      }
      tags[i] = tags[i].split('-')[0];
      if (tags[i].split('-')[1] === '') {
        i += count;
      }
      else {
        i += 1;
      }
      cartItem = {};
      cartItem = {barcode: tags[i], number: count};
      cartItems.push(cartItem);
    }

  }

  for(var a in cartItems){
    for(var b in allItems){
      if (!allItems[b].hasOwnProperty("barcode")&&!allItems[b].hasOwnProperty("name")&&!allItems[b].hasOwnProperty("unit")&&!allItems[b].hasOwnProperty("price")) {
      } else {
        if (cartItems[a] === allItems[b].barcode) {
          allItems[b].count = cartItem[a].count;
          cartItems1.push(allItems[b]);
        }
      }
    }
  }
  return cartItems1;

}
function buildReceiptItems(cartItems){
  var promotions=loadPromotions();
  var receiptItems={};

  var discount=0;
  for(var i in cartItems){
    var count1=0;
    var count2=0;
    for(var j in promotions){
      var barcodes=promotions[j].barcodes;
      for(var k in barcodes)
        var number=cartItems[i].number;
      if(cartItems[i].barcode===barcodes[k]){
        var type=promotions[j].type;
        if(type==='BUY_TWO_GET_ONE_FREE'){
          count1=cartItems[i].price*number;
          number=number/2;
        }
      }
      count2=cartItems[i].price*number;
      discount+=count1-count2;
    }
    var receiptItem={receiptItem:cartItems[i],count:count2};
    receiptItems.push(receiptItem);
  }
  //receiptItems.discount=discount;

  return receiptItems;
}
function summer(receiptItems){
  var summer=0;
  for(var i in receiptItems)
    summer += receiptItems[i].count;
  return summer;
}




