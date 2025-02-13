// server.js
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const rooms = {};

app.prepare().then(() => {
    const server = http.createServer((req, res) => handle(req, res));
    const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

    io.on('connection', (socket) => {
        console.log(`🟢 Connexion : ${socket.id}`);

        socket.on('joinRoom', ({ roomId, username }) => {
            if (!rooms[roomId]) {
                rooms[roomId] = { users: [], votes: {}, revealed: false };
            }
            if (!rooms[roomId].users.includes(username)) {
                rooms[roomId].users.push(username);
            }
            socket.join(roomId);
            io.to(roomId).emit('roomUpdated', rooms[roomId]);
        });

        socket.on('vote', ({ roomId, username, card }) => {
            if (rooms[roomId]) {
                rooms[roomId].votes[username] = card;
                io.to(roomId).emit('roomUpdated', rooms[roomId]);
            }
        });

        socket.on('revealVotes', (roomId) => {
            if (rooms[roomId]) {
                rooms[roomId].revealed = true;
                io.to(roomId).emit('roomUpdated', rooms[roomId]);
            }
        });

        socket.on('resetVotes', (roomId) => {
            if (rooms[roomId]) {
                rooms[roomId].votes = {};
                rooms[roomId].revealed = false;
                io.to(roomId).emit('roomUpdated', rooms[roomId]);
            }
        });

        socket.on('disconnect', () => {
            console.log(`🔴 Déconnexion : ${socket.id}`);
        });
    });

    server.listen(3000, () => console.log('🚀 Serveur en ligne sur http://localhost:3000'));
});
