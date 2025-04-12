// Haal het verhaal op uit URL
const params = new URLSearchParams(window.location.search);
const id = params.get("verhaal");

// gebruikers coordinaten alvast definieren.
let userLat;
let userLng;

// const met alle verhalen
const verhalen = [
    {
        id: 1,
        titel: "Operatie Market Garden",
        tekst: "Operatie Market Garden was een geallieerd offensief gericht tegen nazi-Duitsland in september 1944, tegen het einde van de Tweede Wereldoorlog. De operatie, gekenmerkt door een ruime inzet van luchtlandingstroepen om strategische bruggen op Nederlands grondgebied te veroveren, was uiteindelijk een mislukking doordat de cruciale brug bij Arnhem niet kon worden behouden. De Britse veldmaarschalk Bernard Montgomery pleitte er tijdens de opmars vanuit Normandië, waar de geallieerden op D-day in het bezette Frankrijk geland waren, voor om het hele Duitse hoofdfront, dat hij al verslagen achtte, van het noorden uit te omvatten door de rivieren Maas, Waal en Nederrijn in Nederland te overschrijden. Na enige twijfel ging opperbevelhebber generaal Dwight D. Eisenhower, op 10 september akkoord met dit gewaagde plan. Market Garden bestond uit een grootschalige luchtlandingsoperatie (codenaam Market) en een grondoffensief vanuit België (codenaam Garden). Britse, Poolse en Amerikaanse luchtlandingstroepen zouden belangrijke bruggen over Nederlandse rivieren nemen, waarna grondtroepen over deze bruggen snel zouden kunnen doorstoten naar het IJsselmeer.[2] Dat zou de Duitse troepen in het westen van Nederland afsnijden waarna men naar het oosten zou oprukken tot in het Ruhrgebied, het industriële hart van Duitsland.[2] Zo werd de gevreesde Westwall, de fortificatiegordel tussen Frankrijk en Duitsland, omzeild.",
        afbeelding: "verhaal1.jpg",
        locatie: { lat: 53.0863982 , lng: 6.9759183 }
    },
    {
        id: 2,
        titel: "Oorlogsmonument Onstwedde",
        tekst: "verhaal tekst twee",
        afbeelding: "verhaal2.jpg",
        locatie: { lat: 7.5554942 , lng: 80.7137847 }
    },
    {
        id: 3,
        titel: "Oorlogsmonument nummer 2 Onstwedde",
        tekst: "verhaal tekst drie",
        afbeelding: "verhaal3.jpg",
        locatie: { lat: 53.0333368 , lng: 7.0455729 }
    }
];
// h
// s
// o
const verhaal = verhalen.find(v => v.id === parseInt(id))

// Zet verhaal in de html
if (verhaal) {
    document.getElementById("titel").textContent = verhaal.titel;
    document.getElementById("tekst").textContent = verhaal.tekst;
    document.getElementById("nummer").textContent = "Verhaal " + verhaal.id;
    document.getElementById("afbeelding").src = "img/" + verhaal.afbeelding;
} else {
    // Foreach de verhalen op de homepagina
    const container = document.getElementById("verhalenContainer");

    verhalen.forEach(verhaal => {
        container.innerHTML += 
        `
        <div class="card shadow m-3">
            <div class="text-center">    

            <div class="card-body" id="myInput">
                <h5 class="card-title">Verhaal ${verhaal.id}</h5>

                <h6 class="card-subtitle mb-2 text-muted">        
                    <p>${verhaal.titel}</p>
                </h6>
                
                    <div class="post-image-container mb-4">
                        <img src="img/${verhaal.afbeelding}" alt="Verhaal afbeelding" class="img-fluid rounded mx-auto d-block shadow-2-strong" style="width:300px">
                    </div>    
                    <a href="oorlogsverhaal.html?verhaal=${verhaal.id}" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center verhaal-link">Bekijk verhaal</a>

                    <a href="https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${verhaal.locatie.lat},${verhaal.locatie.lng}" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center route-link">Bekijk route</a>
                </div>
            </div>
        </div>
        `
    });
}


// LOCATIE CODE

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Aarde straal in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Afstand in km
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

// Vraag locatie op van de gebruiker
navigator.geolocation.getCurrentPosition((pos) => {
    userLat = pos.coords.latitude;
    userLng = pos.coords.longitude;
    const threshold = 0.5;

    // Verhaal link
    document.querySelectorAll('.verhaal-link').forEach(link => {
        const verhaalLat = parseFloat(link.getAttribute('data-lat'));
        const verhaalLng = parseFloat(link.getAttribute('data-lng'));
        const distance = getDistanceFromLatLonInKm(userLat, userLng, verhaalLat, verhaalLng);

        if (distance > threshold){
            // Disable de knop wanneer gebruiker uit de radius is
            link.classList.add('disabled');
            link.style.pointerEvents = 'none';
            link.textContent = "Bekijk verhaal";
        const message = document.createElement('p');
        message.textContent = "Je bent buiten het bereik van dit verhaal! Navigeer naar de plek via de route.";
        message.classList.add('text-danger', 'fw-bold', 'mt-5', 'fs-6');
        link.parentElement.appendChild(message);
        }
    });

    document.querySelectorAll('.route-link').forEach(link => {
        const verhaalLat = parseFloat(link.getAttribute('data-lat'));
        const verhaalLng = parseFloat(link.getAttribute('data-lng'));
        const route = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${verhaalLat},${verhaalLng}`

        link.setAttribute('href', route);
        link.setAttribute('target', '_blank');   
    })


}, (err) => {
    console.error("error bij krijgen locatie: ", err)
});