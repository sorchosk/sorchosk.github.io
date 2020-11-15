function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 40.4433, lng: -79.9436 },
    });
    directionsRenderer.setMap(map);
    // calculate the direction based on the default options once
    calculateAndDisplayRoute(directionsService, directionsRenderer);

    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    // add change value event listeners to the "start" and "end" selection elements
    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService.route(
        {
            origin: {
                query: document.getElementById("start").value // get the value of the origin
            },
            destination: {
                query: document.getElementById("end").value // get the value of the destination
            },
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                // Use the modal to display the erorr message:
                // "Directions request failed due to " + status
                // Using jQuery functions
                let pModalEl = document.getElementById("p-modal");
                pModalEl.innerText = "Directions request failed due to " + status;
                $("#myModal").modal("show");
            }
        }
    );
}