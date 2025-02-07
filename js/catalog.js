/ global Product, Cart /

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);
loadCart();

function loadCart() {
  for (let i = 0; i < localStorage.length; i++) {
    let data = localStorage.getItem('cart');
    let parsedArr = JSON.parse(data);
    if (parsedArr !== null) {
      cart.items = parsedArr;
    }
  }
}



// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let option = document.createElement('option');
    option.textContent = Product.allProducts[i].name;
    // option.id = i;
    // console.log(option.id);
    selectElement.appendChild(option);
  }
  // console.log(Product.allProducts);
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault()
  // TODO: Prevent the page from reloading  
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {


  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
  let quantityTb = document.getElementById('quantity').value;
  let ddl = document.getElementById("items");
  let selectedProduct = ddl.value;
  // selectedProduct.id = ddl.value;
  // console.log(selectedProduct.id);
  cart.addItem(selectedProduct, quantityTb);
  // console.log(cart.items);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
let counter = document.getElementById('itemCount');
function updateCounter() {
  counter.textContent = "";
  let data = localStorage.getItem('cart');
  let parsedArr = JSON.parse(data);
  counter.textContent = parsedArr.length;
  // console.log(parsedArr.length);
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  let data = localStorage.getItem('cart');
  let parsedArr = JSON.parse(data);
  let list = document.getElementById('list')
  list.textContent = "";
  for (let i = 0; i < parsedArr.length; i++) {
      let listElement = document.createElement('li')
      list.appendChild(listElement)
      listElement.textContent = `Selected item: ${parsedArr[i].product} with a quantity of: ${parsedArr[i].quantity}`
    }

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();

// console.log(Product.allProducts);