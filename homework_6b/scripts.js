// #############
// ASSIGNMENT 6A
// #############

// set up array for all orders
let bunOrderArray = [];

// Product Page Subtotal Variable
let productPageSubtotal = document.getElementById("productPageSubtotal");

// create a bun object class
class bunOrder {
    constructor(flavor, icing, amount, subtotal, imgURL) {
        this.flavor = flavor;
        this.icing = icing;
        this.amount = amount;
        this.subtotal = subtotal;
        this.imgURL = imgURL;
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

// DISPLAY NUMBER OF OBJECTS IN LOCAL STORAGE
function basketCount() {
    let fullOrderJson = localStorage.getItem("fullOrder");
    // Parse local storage
    let fullOrder = JSON.parse(fullOrderJson);
    if (fullOrder == null) {
        // console.log("No buns. fullOrder: " + fullOrder);
        return;
    } else {
        // Get number of objects from parsed local storage array
        let numberOfBasketObjects = fullOrder.length;
        // Render as an HTML signifier on the basket icon
        let basket = document.getElementById("basket");
        let basketBadge = document.createElement("div");
        basketBadge.className = "basket-badge";
        basketBadge.innerText = numberOfBasketObjects;
        basket.appendChild(basketBadge);
        return;
    }
}

// ADD TO BASKET MODAL
function addToBasketConfirmation() {
    console.log('Order Confirmed');
    let body = document.getElementsByTagName("body")[0];
    let confirmationModalContainer = document.createElement("div");
    confirmationModalContainer.className = "modal-container";
    confirmationModalContainer.id = "confirmationModal";

    // Remove button in the top right corner
    let confirmationModal = document.createElement("div");
    confirmationModal.className = "modal";
    confirmationModal.innerHTML = "<img src='./img/SVG/close.svg' class='modal-close' onclick='removeModal()' />"

    // H2 text to validate it was added
    let confirmationModalHeading = document.createElement("h2");
    confirmationModalHeading.innerHTML = "Added to Basket";
    confirmationModal.appendChild(confirmationModalHeading);

    // Append buttons to the modal
    let confirmationModalButtons = document.createElement("div");
    confirmationModalButtons.className = "btn-group";
    confirmationModalButtons.innerHTML = "<a href='./basket.html' class='btn btn--primary'>Checkout</a><a href='./flavors.html' class='btn btn--secondary'>Add More</a>"
    confirmationModal.appendChild(confirmationModalButtons);

    // Append modal to the container
    confirmationModalContainer.appendChild(confirmationModal);

    // Append container to the body of the page
    body.appendChild(confirmationModalContainer);
}

// REMOVE MODAL
function removeModal() {
    console.log("Remove Modal Activated");
    modal = document.getElementById("confirmationModal");
    confirmationModal.remove();
    document.location.reload();
    return;
}

// ONCLICK FUNCTIONS FOR BUNS
function addToBasket() {
    console.log("Add to Basket Initiated");
    // get bun flavor
    let flavor = document.getElementById("flavor").innerText.toLowerCase();
    // get icing flavor
    let icingValue = document.querySelector('input[name="icing"]:checked').value;
    // get amount
    let amountValue = document.querySelector('input[name="amount"]:checked').value;
    // get subtotal
    let productPageSubtotalValue = productPageSubtotal.innerHTML;
    // get img thumbnail
    let bunThumbnailImageURL = "./img/2x/thumb-" + flavor.split(' ').join('_') + "@2x.png";

    // create a new bun object
    let singleOrder = new bunOrder(flavor, icingValue, amountValue, productPageSubtotalValue, bunThumbnailImageURL);
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

    // refresh basket badge count
    basketCount();

    // Order Confirmation Modal
    addToBasketConfirmation();

    // Clear form fields
    document.getElementById("productForm").reset();

    console.log("Add to Basket complete");
    return;
}

// When the page loads, convert local storage to the bunOrderArray
// and run the basketCount() function
function onLoad() {
    let fullOrderJson = localStorage.getItem("fullOrder");
    // Parse local storage
    let fullOrder = JSON.parse(fullOrderJson);
    if (fullOrder != null) {
        bunOrderArray = JSON.parse(localStorage.getItem("fullOrder"));
    }
    basketCount();
}

// #############
// ASSIGNMENT 6B
// #############

// Convert bunOrder object classes to line items
function renderBunOrder(bunOrder, count) {
    // Target the basketList ID in the DOM
    let basketList = document.getElementById("basketList");

    // Create the basket-item div
    let basketItem = document.createElement("div");
    basketItem.className = "flex basket-item";

    // Add the basket item image
    let basketItemImg = document.createElement("img");
    basketItemImg.src = bunOrder.imgURL;
    basketItemImg.className = "flavor__thumb-img basket-item__img";
    basketItem.appendChild(basketItemImg);

    // Add the basket item text
    let basketItemText = document.createElement("p");
    basketItemText.className = "basket-item__p";
    basketItemText.innerText = `1 order of ${bunOrder.amount} ${bunOrder.flavor} buns with ${bunOrder.icing} icing.`
    basketItem.appendChild(basketItemText);

    // Add the remove button to each basket item
    let basketItemRemoveButton = document.createElement("a");
    basketItemRemoveButton.className = "basket-item__remove";
    basketItemRemoveButton.setAttribute("item", count);
    basketItemRemoveButton.setAttribute("onclick", "removeFromBasket(this.getAttribute('item'))");

    let basketItemRemoveButtonImg = document.createElement("img");
    basketItemRemoveButtonImg.src="./img/SVG/close.svg";
    basketItemRemoveButton.appendChild(basketItemRemoveButtonImg);

    let basketItemRemoveButtonText = document.createElement("p");
    basketItemRemoveButtonText.innerText = "Remove";
    basketItemRemoveButton.appendChild(basketItemRemoveButtonText);
    basketItem.appendChild(basketItemRemoveButton);

    // Append to basketList in the DOM
    basketList.appendChild(basketItem);
}

// DISPLAY BUN ARRAY TO BASKET PAGE
// get basket list when basket page loads
function basketOnLoad() {
    let fullOrderJson = localStorage.getItem("fullOrder");
    // Parse local storage
    let fullOrder = JSON.parse(fullOrderJson);
    let basketList = document.getElementById("basketList");
    // loop through each bun in bun array
    if (fullOrder == null) {
        // No buns to display
        console.log("No buns to display");
    } else {
        // Buns in local storage
        console.log("Start bun display");
        let i = 0;
        fullOrder.forEach(bun => {
            renderBunOrder(bun, i);
            i++;
        });
    }
    return;
}

// REMOVE AN ITEM FROM CART
function removeFromBasket(item) {
    // get basket list
    let fullOrderJson = localStorage.getItem("fullOrder");
    let fullOrder = JSON.parse(fullOrderJson);
    // get number of this basket-item
    let itemToRemove = item;
    console.log("Remove at index: " + itemToRemove);
    // remove that index from the cart
    fullOrder.splice(itemToRemove, 1);
    // set new order list to local storage
    let newOrder = JSON.stringify(fullOrder);
    localStorage.setItem("fullOrder", newOrder);
    // refresh page
    document.location.reload();
}

// CLEAR LOCALSTORAGE
function clearAll() {
    localStorage.removeItem("fullOrder");
    console.log("Storage Cleared");
    document.location.reload();
}

// #############
// EXTRA CREDIT
// #############

