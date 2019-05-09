var map;

var mapCenterLat = 52;
var mapCenterLong = 9;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: mapCenterLat, lng: mapCenterLong},
            zoom: 8
    });
}


function setMapCenter(lat, lon){
    mapCenterLat = this.lat;
    mapCenterLong = this.lon;
}