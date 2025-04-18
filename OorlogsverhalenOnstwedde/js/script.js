// CODE OM DE LOCATIE TE VERFERSEN EN UIT JSON TE HALEN + LOGICA
// Locaties in de json file op basis van ID oplopend:
// Openbare Begraafplaats
// Dorpstraat 66
// Luringstraat 22
// Dorpsstraat 49
// Dorpsstraat 27
// Havenstraat 5 – Bakkerij Ten Have
// Kerklaan 18

// gebruikers coordinaten alvast definieren.
let userLat;
let userLng;

// Var voor aangeven afstand wanneer verhaal beschikbaar (in km)
// Check op 50 meters
const threshold = 0.05;

// Var voor audio bijhouden
let audio = null;


document.addEventListener("DOMContentLoaded", () => {
    getVerhaal()
    
    // Refresh de verhalenContainer elke 5 seconden met de nieuwe locatie
    function refreshLoop() {
        refreshLocation();
        setTimeout(refreshLoop, 5000);
    }

    // start de loop
    refreshLoop();

    // Functie om de locatie te verversen
    function refreshLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                userLat = position.coords.latitude;
                userLng = position.coords.longitude;
                
                const locationDisplay = document.getElementById("locationDisplay");
                if (locationDisplay) {
                    locationDisplay.innerText = `DEBUG: Huidige locatie (periodieke refresh): ${userLat}, ${userLng}`;
                }

                console.log("Location updated:", userLat, userLng);

                fetchVerhalen();
            },
            error => {
                console.warn("Location update failed:", error);

                fetchVerhalen();
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }

    // Ververs de locatie wanneer naar tab geswitched wordt (en dus weer in beeld komt)
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            refreshLocation();
            console.log("Gerefreshed d.m.v. visible")
        }
    });

    // Nog meer checks voor tab switch of unlock en lock telefoon
    window.addEventListener("pageshow", () => {
            refreshLocation();
            console.log("Gerefreshed d.m.v. visible")
    });

    // Fetch de data nu vanuit een json file
    function fetchVerhalen() {
        const verhalenContainer = document.getElementById("verhalenContainer");
        const loadingDiv = document.getElementById("loading");

        if (verhalenContainer && loadingDiv) {
            fetch(`verhalen.json?nocache=${new Date().getTime()}`)
                .then(response => response.json())
                .then(data => {
                    renderVerhalen(data);
                    if (loading.style.display !== "none") {
                        loading.style.display = "none";
                    }
                })
                .catch(error => {
                    console.error("Error fetching verhalen:", error);
                });
        }
    }

    // Help functie om de logica voor checken distance ook te applyen op de json data vanuit verhalen.json
    function renderVerhalen(verhalen) {
        const verhalenContainer = document.getElementById("verhalenContainer");
        verhalenContainer.innerHTML = '';

        verhalen.forEach(verhaal => {
            const isUserLocationSet = userLat !== undefined && userLng !== undefined;
            const route = `https://www.google.com/maps/dir/?api=1${isUserLocationSet ? `&origin=${userLat},${userLng}` : ''}&destination=${verhaal.locatie.lat},${verhaal.locatie.lng}`;

            const distance = getDistanceFromLatLonInKm(userLat, userLng, verhaal.locatie.lat, verhaal.locatie.lng);


            const storyHtml = `
                <div class="card shadow m-3" id="verhaal${verhaal.id}">
                    <div class="text-center">    
                        <div class="card-body" id="myInput">
                            <h5 class="card-title">Verhaal ${verhaal.id}</h5>

                            <h6 class="card-subtitle mb-2 text-muted">        
                                <p>${verhaal.titel}</p>
                            </h6>
                            
                            <div class="post-image-container mb-4">
                                <img src="img/${verhaal.afbeelding}" alt="Verhaal afbeelding" class="img-fluid rounded mx-auto d-block shadow-2-strong">
                            </div>    

                            <a href="oorlogsverhaal.html?verhaal=${verhaal.id}" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center verhaal-link">Bekijk verhaal</a>

                            <a href="${route}" target="_blank" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center route-link"> <i class="bi bi-geo-alt"></i> Route</a>
                        </div>
                    </div>
                </div>
            `;

            if (distance > threshold) {
                const disabledStoryHtml = `
                    <div class="card shadow m-3" id="verhaal${verhaal.id}">
                        <div class="text-center">    
                            <div class="card-body" id="myInput">
                                <h5 class="card-title">Verhaal ${verhaal.id}</h5>

                                <h6 class="card-subtitle mb-2 text-muted">        
                                    <p>${verhaal.titel}</p>
                                </h6>
                                
                                <div class="post-image-container mb-4">
                                    <img src="img/${verhaal.afbeelding}" alt="Verhaal afbeelding" class="img-fluid rounded mx-auto d-block shadow-2-strong" style="width:250px;">
                                </div>    

                                <a href="oorlogsverhaal.html?verhaal=${verhaal.id}" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center verhaal-link disabled" style="pointer-events: none;" > <i class="bi bi-book"></i> Bekijk verhaal</a>

                                <a href="${route}" target="_blank" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center route-link"> <i class="bi bi-geo-alt-fill"></i> Route</a>

                                <div class="alert alert-danger mt-3" role="alert" style="font-size: 0.7rem; font-weight:bold;">
                                    Je bent buiten het bereik van dit verhaal! Navigeer naar dit verhaal via de route!
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                verhalenContainer.innerHTML += disabledStoryHtml;
            } else {
                verhalenContainer.innerHTML += storyHtml;
            }
        });

        // Wanneer gescrolled moet worden naar een specifiek verhaal, wacht totdat alle verhalen zijn geladen en scroll daarna.
        const hash = window.location.hash;
        if (hash) {
            setTimeout(function() {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                    history.replaceState(null, null, window.location.pathname + window.location.search);
                }
            }, 100);
        }
    }

    function getVerhaalParam(id) {
        // Haal het verhaal op uit URL
        const params = new URLSearchParams(window.location.search);
        return params.get(id);
    }

    function getVerhaal() {
        const id = getVerhaalParam("verhaal");
        if (!id) return;

        fetch(`verhalen.json?nocache=${new Date().getTime()}`)
            .then(response => response.json())
            .then(data => {
                const verhaal = data.find(v => v.id === parseInt(id));
                if (verhaal) {
                    renderVerhaal(verhaal);
                } else {
                    console.error("Geen verhaal gevonden");
                }
            })
            .catch(error => {
                console.error("Error verkrijgen verhaal:", error);
            });

    }

    function renderVerhaal(verhaal) {
        document.getElementById("titel").textContent = verhaal.titel;
        document.getElementById("tekst").textContent = verhaal.tekst;
        document.getElementById("nummer").textContent = "Verhaal " + verhaal.id;
        document.getElementById("afbeelding").src = "img/" + verhaal.afbeelding;

        // Creeer button net voor het element met id tekst, die onclick="Voorlezen()"
        const button = document.createElement("button");
            button.className = "btn btn-outline-dark";
            button.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
            button.addEventListener("click", function() {
                voorlezen(verhaal.id, button);
            });

            const volumeDiv = document.getElementById("volume");
            volumeDiv.innerHTML = '';
            volumeDiv.appendChild(button);
    }

    function voorlezen(id, button){
        const volumeDiv = document.getElementById("volume");

        // Maak een nieuw audio object aan wanneer de audio null is || gepauzeerd.
        if (!audio || audio.paused) {
            if (!audio) {
                audio = new Audio(`sounds/verhaal${id}.mp3`);
            }
            // Speel af
            audio.play();

            // zet knop op pause icon
            button.innerHTML = '<i class="bi bi-pause-fill"></i>';
        } else {
            // Pauzeer en zet knop naar resume icon
            audio.pause();
            button.innerHTML = '<i class="bi bi-play-fill"></i>';
        }

        let stopButton = document.getElementById("stopButton");

        if (!stopButton) {
           stopButton = document.createElement("button");
           stopButton.className = "btn btn-outline-dark ms-1";
           stopButton.innerHTML = '<i class="bi bi-stop-fill"></i>';
           stopButton.id = "stopButton"
           stopButton.addEventListener("click", function (){
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                    button.innerHTML = '<i class="bi bi-play-fill"></i>';
                    stopButton.remove();
                }
            });

        volumeDiv.appendChild(stopButton);
        }
    }

    // Luister naar locatie rechten verandering, zodat we direct de locatie kunnen fetchen wanneer permission = granted
    navigator.permissions.query({ name: 'geolocation' }).then(function(permissionStatus) {
        console.log('Locatie rechten zijn:', permissionStatus.state);
    
        permissionStatus.onchange = function() {
            console.log('Locatie rechten veranderd naar:', permissionStatus.state);
    
            if (permissionStatus.state === 'granted') {
                refreshLocation();
            }
        };
    });

    // Debug hidden, type ?debug=true in url
    const urlParams = new URLSearchParams(window.location.search);
    const debug = urlParams.get('debug');

    if (debug === 'true') {
        const locationDisplay = document.getElementById('locationDisplay');
        if (locationDisplay) {
            locationDisplay.style.display = 'block';
        }
    }
});

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
