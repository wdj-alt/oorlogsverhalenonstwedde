// Coords voor de locaties in de map
let locations = [
    [53.042147, 7.043593],
    [53.039145, 7.0436952],
    [53.039016, 7.040799],
    [53.03782653808594, 7.043193340301514],
    [53.03559112548828, 7.042584419250488],
    [53.0331046, 7.0427122],
    [53.0319457, 7.0430776]
];

// Zet midden van map in ongeveer hartje Onstwedde
let map = L.map('map').setView([53.040441538755736, 7.0433596907053015], 16); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ''
}).addTo(map);

let latlngs = [];

// Loop door coords en zet marker op elke locatie
locations.forEach(function(coord, index) {
    let marker = L.marker(coord).addTo(map);

    marker.bindPopup("<b>Verhaal " + (index + 1) + "</b><br><a class='fw-bold' href='index.html#verhaal" + (index + 1) + "'>Bekijken");

    // Zet coords in array voor de polylines.
    latlngs.push(coord);
});

// Zet polylines.
L.polyline(latlngs, {color: 'blue', weight: 3}).addTo(map);

// Finish emoji 
L.marker(locations[locations.length - 1], {
    icon: L.divIcon({
        className: 'end-icon',
        html: '🏁',
        iconSize: [30, 30]
    })
}).addTo(map).bindPopup("Einde");

let userMarkerIcon = L.divIcon({
    html: '<div class="legendUserMarker"></div>',
    className: 'userMarker',
    iconSize: [30, 30]
});

let userMarker = L.marker([0, 0], { icon: userMarkerIcon}).addTo(map);

function refreshUserMarker() {
    navigator.geolocation.getCurrentPosition(
        position => {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;

            userMarker.setLatLng([userLat, userLng]);

            // Show de user location in de legenda als locatie is verkegen.
            if (userLat && userLng){
                document.getElementById("legendUserLocation").style.display = "flex"
            }

            console.log("User marker gerefreshed:", userLat, userLng);

        },
        error => {
            console.warn("User update niet gerefreshed:", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

setInterval(refreshUserMarker, 5000);

refreshUserMarker();