// Coords voor de locaties in de map
var locations = [
    [53.042147, 7.043593],
    [53.039145, 7.0436952],
    [53.039016, 7.040799],
    [53.03782653808594, 7.043193340301514],
    [53.03559112548828, 7.042584419250488],
    [53.0331046, 7.0427122],
    [53.0319457, 7.0430776]
];

// Zet midden van map in ongeveer hartje Onstwedde
var map = L.map('map').setView([53.040441538755736, 7.0433596907053015], 16); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ''
}).addTo(map);

var latlngs = [];

// Loop door coords en zet marker op elke locatie
locations.forEach(function(coord, index) {
    var marker = L.marker(coord).addTo(map);

    marker.bindPopup("Verhaal " + (index + 1));

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