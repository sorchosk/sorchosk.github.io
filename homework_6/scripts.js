// ADD BUN TO AN ARRAY

// set up array
let bunOrderArray = [];

// Product Page Subtotal Variable
let productPageSubtotal = document.getElementById("productPageSubtotal");

// create a bun object (class?)
class bunOrder {
    constructor(flavor, icing, amount, subtotal) {
        this.flavor = flavor;
        this.icing = icing;
        this.amount = amount;
        this.subtotal = subtotal;
    }
}

// change subtotal when amount button changes
function updateProductSubtotal() {
    // establish subtotal variable
    let productSubtotal = 0;
    // get current value from "amount" fields
    let amountValue = document.querySelector('input[name="amount"]:checked').value;
    // assign monetary value at each amount level
    if (amountValue == 1) {
        productSubtotal = 1.99;
    } else if (amountValue == 3) {
        productSubtotal = 4.99;
    } else if (amountValue == 6) {
        productSubtotal = 8.99;
    } else {
        productSubtotal = 15.99;
    }
    // update subtotal in HTML
    productPageSubtotal.innerHTML = productSubtotal;

    console.log(productSubtotal);
}

// onclick function for bun
function addToBasket() {
    console.log("Add to Basket Initiated");
    // get bun flavor
    let flavor = document.getElementById("flavor").innerText;
    // get icing flavor
    let icingValue = document.querySelector('input[name="icing"]:checked').value;
    // get amount
    let amountValue = document.querySelector('input[name="amount"]:checked').value;
    // get subtotal
    let productPageSubtotalValue = productPageSubtotal.innerHTML;

    // create a new bun object
    let singleOrder = new bunOrder(flavor, icingValue, amountValue, productPageSubtotalValue);
    console.log("singleOrder object: " + singleOrder);
    // push singleOrder to the array
    bunOrderArray.push(singleOrder);
    console.log(bunOrderArray);
    // convert to json value
    const jsonSingleOrder = JSON.stringify(bunOrderArray);
    // set local variable
    let localStorage = window.localStorage;
    // store the new array to local storage
    localStorage.setItem("fullOrder", jsonSingleOrder);
    console.log(localStorage.getItem("fullOrder"));

    console.log("Add to Basket complete");
    return;
}

// DISPLAY BUN ARRAY TO BASKET PAGE
// get basket list when basket page loads
function onLoad() {
    console.log("Testing page load");
}
// loop through each bun in bun array