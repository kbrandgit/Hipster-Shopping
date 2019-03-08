var viewCartButton = document.getElementsByClassName('view-cart')[0];
var shoppingCart = document.getElementsByClassName('shopping-cart')[0];
var products = document.getElementsByClassName('products')[0];
var clearBtn = document.getElementsByClassName('btn clear-cart')[0];
var removeItem = document.getElementsByClassName('cart-list')[0];
var cart = [];
var prev = {};

viewCartButton.addEventListener('click', function () {
  if (shoppingCart.classList.contains('show')) {
    shoppingCart.className = 'shopping-cart';
  } else {
    shoppingCart.className += ' show';
  }
});

clearBtn.addEventListener('click', function() {
  cart = [];
  renderCart();
}); 

removeItem.addEventListener('click', function(e) {
  for (var i=0; i<cart.length; i++) {
    if (cart[i]["name"] == e.target.id) {
      cart.splice(i,1);
    }
  }
  renderCart();
  });

products.addEventListener('click', function (e) {
  var newItem = true;
  if (e.target.classList.contains('add-to-cart')) {
    var itemName = e.target.closest('.item')
      .getAttribute('data-name');

    var itemPrice = e.target.closest('.item')
      .getAttribute('data-price');
    
  for (var i=0; i<cart.length; i++) {
    if (itemName == cart[i]["name"]) { //Item already exists in cart, increment quantity and increase subtotal
      cart[i]["quantity"] += 1;
      cart[i]["price"] = itemPrice * cart[i]["quantity"];
      newItem=false; //Not a new cart item
      }  
  }
    if (newItem == true) { //new item
      var product = {
      name: itemName,
      price: itemPrice,
      quantity: 1
    } 
    cart.push(product);
  }

  renderCart();
  }
});

var renderCart = function () {
  var cartList = document.getElementsByClassName('cart-list')[0];

  while(cartList.hasChildNodes()) {
    cartList.removeChild(cartList.firstChild);
  }

  var items = '';
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    items += '<div id="'+cart[i].name +'" class=items' + '>' + cart[i].name 
      + ' - $' + cart[i].price + ' (' + cart[i].quantity + ')</div>';
      total += parseInt(cart[i].price);
  }
  document.querySelector(".totalTag").innerHTML = 'Total: $' +total;
  cartList.innerHTML = items;
};