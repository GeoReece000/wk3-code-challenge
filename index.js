const moviesMenu = document.querySelector("#movies-menu");
const movieDetails = document.querySelector("#movie-details");
const poster = document.querySelector("#poster");
const title = document.querySelector("#title");
const runtime = document.querySelector("#runtime");
const showtime = document.querySelector("#showtime");
const tickets = document.querySelector("#tickets");
const buyTicketBtn = document.querySelector("#buy-ticket-btn");

// Fetch movie data from db.json
fetch("db.json")
    .then(response => response.json())
    .then(data => {
        const films = data.films;
        // Populate movies menu
        for (let film of films) {
            const menuItem = document.createElement("div");
            menuItem.classList.add("movie-menu-item");
            menuItem.innerText = film.title;
            menuItem.addEventListener("click", () => {
                // Update movie details section with selected movie
                poster.src = film.poster;
                title.innerText = film.title;
                runtime.innerText = `Runtime: ${film.runtime} minutes`;
                showtime.innerText = `Showtime: ${film.showtime}`;
                const availableTickets = film.capacity - film.tickets_sold;
                tickets.innerText = `Tickets available: ${availableTickets}`;
                if (availableTickets > 0) {
                    buyTicketBtn.disabled = false;
                } else {
                    buyTicketBtn.disabled = true;
                }
            });
            moviesMenu.appendChild(menuItem);
        }
        // Load details of first movie by default
        const firstFilm = films[0];
        poster.src = firstFilm.poster;
        title.innerText = firstFilm.title;
        runtime.innerText = `Runtime: ${firstFilm.runtime} minutes`;
        showtime.innerText = `Showtime: ${firstFilm.showtime}`;
        const availableTickets = firstFilm.capacity - firstFilm.tickets_sold;
        tickets.innerText = `Tickets available: ${availableTickets}`;
        if (availableTickets > 0) {
            buyTicketBtn.disabled = false;
        } else {
            buyTicketBtn.disabled = true;
        }
    });
    
buyTicketBtn.addEventListener("click", () => {
    const currentTickets = parseInt(tickets.innerText.split(": ")[1]);
    const newTickets = currentTickets - 1;
    tickets.innerText = `Tickets available: ${newTickets}`;
    if (newTickets === 0) {
        buyTicketBtn.disabled = true;
    }
});
