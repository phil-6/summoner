
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        console.log(userPos);
        // document.getElementById("location").innerHTML = (userPos.lat+ ', ' +userPos.lng);
        document.getElementById("userLat").value = userPos.lat;
        document.getElementById("userLng").value = userPos.lng;

    }, function() {
            handleLocationError(true, userPos );
    });
} else {
    // Browser doesn't support Geolocation
    defaultPos = {lat: 51.600000, lng: -4.150000};
    handleLocationError(false,  defaultPos);
}

function handleLocationError(browserHasGeolocation, pos) {

    console.log(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

