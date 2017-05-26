/**
 * Created by shuwei on 2017/5/23.
 */
//TODO: 请补完下面的函数以完成需求.
function   printReceipt(inputs) {
  var cartItems=buildCartItems(inputs);
  var receiptItems=buildReceiptItems(cartItems);

  var summe=sum(receiptItems);
  var list="";
  for(var i in receiptItems)
    list+="名称："+receiptItems[i].name+"，数量："+receiptItems[i].number+"，单价："+receiptItems[i].price+"(元)，小计："+receiptItems[i].count+"(元)\n";
  console.log("***<没钱赚商店>收据***\n"+list+"----------------------\n"+"总计："+summe+"(元)\n"+"节省："+receiptItems.discount+"(元)\n"+"**********************");

}
function buildCartItems(inputs){
  var  cartItem={};
  var allItems = loadAllItems();
  var cartItems = [];
  var cartItems1 = {};
  for (var i = 0; i <inputs.length;) {
    var count = 0;
    for (var j = i; j < inputs.length; j++) {
      if (inputs[j] === inputs[i]) {
        count++;
      }
    }
    if(inputs[i].includes("-")){
        inputs[i]=inputs[i].split('-')[0];
        number=inputs[i].split('-')[1];
        i++;
    }
    cartItem = {barcode: inputs[i], number: count};
    cartItems.push(cartItem);
    i += count;
  }
  for(var a in cartItems) {
    for (var b in allItems) {
      if (cartItems[a] === allItems[b].barcode) {
        allItems[b].count = cartItem[a].count;
        cartItems1.push(allItems[b]);
      }
    }
    return cartItems1;
  }
}
function buildReceiptItems(cartItems){
  var promotions=loadPromotions();
  var receiptItems={};
  var barcodes = [];
  var discount=0;
  for(var i in cartItems){
    var count1=0;
    var count2=0;
    for(var j in promotions){
      barcodes=promotions[j].barcodes;
      for(var k in barcodes) {
        var number = cartItems[i].number;
        count1=cartItems[i].price*number;
        if (cartItems[i].barcode === barcodes[k]) {
          var type = promotions[j].type;
          if (type === 'BUY_TWO_GET_ONE_FREE') {
            number = parseInt(number / 2);
          }
        }
        count2 = cartItems[i].price * number;
      }
    }
    discount+=count1-count2;
    var receiptItem={receiptItem:cartItems[i],count:count2};
    receiptItems.push(receiptItem);
  }
  receiptItems.discount=discount;

  return receiptItems;
}


function sum(receiptItems){
  var summer=0;
  for(var i in receiptItems)
    summer += receiptItems[i].count;
  return summer;
}




