const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let players = []; // Lista dei giocatori

// Serve i file statici dalla cartella 'public'
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Un utente si è connesso');

    // Aggiungi il giocatore quando si unisce
    socket.on('join', (name) => {
        if (!players.includes(name)) {
            players.push(name); // Aggiunge il nome alla lista
            io.emit('updatePlayers', players); // Aggiorna la lista su tutti i client
        }
    });

    // Rimuovi il giocatore quando si disconnette (opzionale)
    socket.on('disconnect', () => {
        console.log('Un utente si è disconnesso');
    });
});

// Avvia il server
server.listen(3000, () => {
    console.log('Server avviato su http://localhost:3000');
});