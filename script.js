const socket = io();

const form = document.getElementById('joinForm');
const nameInput = document.getElementById('nameInput');
const playersList = document.getElementById('playersList');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita il ricaricamento della pagina
    const name = nameInput.value.trim();
    if (name) {
        socket.emit('join', name); // Invia il nome al server
        nameInput.value = ''; // Pulisce il campo
    }
});

// Aggiorna la lista dei giocatori quando ricevi dati dal server
socket.on('updatePlayers', (players) => {
    playersList.innerHTML = ''; // Pulisce la lista
    players.forEach((player) => {
        const li = document.createElement('li');
        li.textContent = player;
        playersList.appendChild(li);
    });
});
