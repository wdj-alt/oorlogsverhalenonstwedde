// CODE OM DE LOCATIE TE VERFERSEN EN UIT JSON TE HALEN + LOGICA

document.addEventListener("DOMContentLoaded", () => {
    // Refresh de verhalenContainer elke 6 seconden met de nieuwe locatie
    function refreshLoop() {
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
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );

        setTimeout(refreshLoop, 5000);
    }

    // start de loop
    refreshLoop();

    // Functie om alleen de locatie te verversen.
    function refreshLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                userLat = position.coords.latitude;
                userLng = position.coords.longitude;

                fetchVerhalen();

                const locationDisplay = document.getElementById("locationDisplayVisisble");
                if (locationDisplay) {
                    locationDisplay.innerText = `DEBUG: Huidige locatie (na visible): ${userLat}, ${userLng}`;
                }

                console.log("Gerefreshed toen tab in beeld kwam met", userLat, userLng);

            },
            error => {
                console.warn("Location niet verkegen na nieuw scherm:", error);
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
        }
    });

    // Nog meer checks voor tab switch of unlock en lock telefoon
    window.addEventListener("pageshow", () => {
            refreshLocation();
    });

    // Fetch de data nu vanuit een json file
    function fetchVerhalen() {
        const verhalenContainer = document.getElementById("verhalenContainer");

        if (verhalenContainer) {
            fetch(`verhalen.json?nocache=${new Date().getTime()}`)
                .then(response => response.json())
                .then(data => {
                    renderVerhalen(data);
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
            const threshold = 0.1;

            const storyHtml = `
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

                            <a href="${route}" target="_blank" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center route-link"> <i class="bi bi-geo-alt"></i> Bekijk route</a>
                        </div>
                    </div>
                </div>
            `;

            if (distance > threshold) {
                const disabledStoryHtml = `
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

                                <a href="oorlogsverhaal.html?verhaal=${verhaal.id}" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center verhaal-link disabled" style="pointer-events: none;" > <i class="bi bi-book"></i> Bekijk verhaal</a>

                                <a href="${route}" target="_blank" data-lat="${verhaal.locatie.lat}" data-lng="${verhaal.locatie.lng}" class="card-link btn btn-dark shadow text-center route-link"> <i class="bi bi-geo-alt-fill"></i> Route</a>

                                <div class="alert alert-danger mt-4" role="alert">
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
    }
});