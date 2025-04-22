document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("open-modal")) {
        const huidige_afbeelding = e.target.getAttribute("data-huidige-afbeelding");
        const mapsRoute = e.target.getAttribute("data-route");
        const modal_body = document.getElementById("verhaalModalBody");
        const modal_footer = document.getElementById("verhaalModalFooter");

        modal_body.innerHTML = `<img src="img/${huidige_afbeelding}" class="img-fluid rounded shadow mb-3"">`;

        modal_footer.innerHTML = `<a href="${mapsRoute}" target="_blank" class="btn btn-dark shadow"> <i class="bi bi-geo-alt-fill"></i> Route </a>`

        const myModal = new bootstrap.Modal(document.getElementById('verhaalModal'));
        myModal.show();
        }
    });