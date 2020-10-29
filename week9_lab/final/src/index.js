// Below is the last activity in lab which puts together everything we've
// covered in the lab thus far. It has ond main buttons: "Add Random Doggo".
// "Add Random Doggo" fetches a randmo dog image using the Dog API
// https://dog.ceo/dog-api/documentation
function CardTemplate(parentEl, breedName, desc, imgUrl) {
    // find the number of doggo cards displayed on page so far
    let numDoggosOnPage = document.querySelectorAll("div.card").length;

    let divContainer = document.createElement("div");
    divContainer.className = "card";
    parentEl.appendChild(divContainer);

    let img = document.createElement("img");
    img.src = imgUrl;
    img.width = 200;
    img.setAttribute("index", numDoggosOnPage); // saving the index number of the doggo based on how many visible
                                                // doggo cards there are
    divContainer.appendChild(img);

    let divTextContainer = document.createElement("div");
    divTextContainer.className = "text";
    divContainer.appendChild(divTextContainer);

    let breed = document.createElement("h2");
    breed.innerHTML = breedName;
    divTextContainer.appendChild(breed);

    let bodyTextEl = document.createElement("p");
    bodyTextEl.innerHTML = desc;
    divTextContainer.appendChild(bodyTextEl);

    addCardClickHandler(img);

    return divContainer;
}

function getBreedName(msgUrl) {
    // URL is formatted for example https://images.dog.ceo/breeds/basenji/n02110806_5381.jpg
    let pathComponents = msgUrl.split("/");
    return pathComponents.slice(-2, -1)[0];
}

function createNewRandomDoggoCard(containerEl) {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => response.json())
        .then((data) => {
            let breed = getBreedName(data.message);
            CardTemplate(containerEl, breed, "🐶 🐕 ❤️", data.message);
        });
}

window.onload = function() {
    // wait until the DOM is fully loaded
    addCreateRandomClickHandler();
};

function addCreateRandomClickHandler() {
    let aCreateRandom = document.getElementById("a-create-random");
    const divDoggoContainer = document.getElementById("div-doggos");
    aCreateRandom.onclick = function (e) {
        e.preventDefault();
        createNewRandomDoggoCard(divDoggoContainer);
    };
}

function addCardClickHandler(img) {
    // Step 1. Add a click event handler to {img}
    // Step 2. Using the "clicked" class (see style.css), manipulate the look of the clicked doggo card
    // Challenge. Maintain only the 3 most recently clicked doggo cards
    img.onclick = function(e) {
        e.preventDefault();

        let selectedDoggosIndexStr = window.localStorage.getItem("selectedDoggosIndex");
        let selectedDoggosIndex = JSON.parse(selectedDoggosIndexStr) || [];
        if (selectedDoggosIndex.length === 3) {
            // bump the last one
            let firstDoggoIndex = selectedDoggosIndex[0];
            let firstDoggoImg = document.querySelector("img[index='" + firstDoggoIndex + "']");
            firstDoggoImg.classList.remove("clicked");
            selectedDoggosIndex = selectedDoggosIndex.slice(1)
            selectedDoggosIndex.push(e.target.getAttribute("index"));
        } else {
            selectedDoggosIndex.push(e.target.getAttribute("index"));
        }
        // now add the clicked class to the newly clicked doggo card img and store the index
        img.classList.add("clicked");        
        window.localStorage.setItem("selectedDoggosIndex", JSON.stringify(selectedDoggosIndex));
    }
}


function clearCache() {
    window.localStorage.setItem("selectedDoggosIndex", "null");
}
