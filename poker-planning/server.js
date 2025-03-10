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

    server.on('request', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    });


    io.on('connection', (socket) => {
        console.log(`🟢 Connexion : ${socket.id}`);

        socket.on('joinRoom', ({ roomId, username }) => {
            console.log(`User ${username} joining room: ${roomId}`);

            // Créer la room si elle n'existe pas
            if (!rooms[roomId]) {
                rooms[roomId] = { users: [], votes: {}, revealed: false };
            }

            // Ajouter l'utilisateur à la room s'il n'y est pas déjà
            if (!rooms[roomId].users.includes(username)) {
                rooms[roomId].users.push(username);
            }

            socket.join(roomId);

            // Log des données avant envoi et validation
            console.log(`Room ${roomId} state before emit:`, rooms[roomId]);

            // Validation de la structure de la room
            if (!Array.isArray(rooms[roomId].users)) {
                rooms[roomId].users = [];
                console.error(`Invalid users array in room ${roomId}, resetting.`);
            }

            if (typeof rooms[roomId].votes !== 'object') {
                rooms[roomId].votes = {};
                console.error(`Invalid votes object in room ${roomId}, resetting.`);
            }

            // Envoyer les informations actualisées de la room
            io.to(roomId).emit('roomUpdated', rooms[roomId]);
        });

        socket.on('vote', ({ roomId, username, card }) => {
            console.log(`User ${username} voting ${card} in room ${roomId}`);

            if (rooms[roomId]) {
                // Mettre à jour les votes
                rooms[roomId].votes[username] = card;

                // Log des données avant envoi et validation
                console.log(`Room ${roomId} state after vote:`, rooms[roomId]);

                // Validation de la structure des votes
                if (typeof rooms[roomId].votes !== 'object') {
                    rooms[roomId].votes = {};
                    console.error(`Invalid votes object in room ${roomId}, resetting.`);
                }

                io.to(roomId).emit('roomUpdated', rooms[roomId]);
            }
        });

        socket.on('revealVotes', (roomId) => {
            console.log(`Revealing votes in room ${roomId}`);
            if (rooms[roomId]) {
                rooms[roomId].revealed = true;

                // Log des données avant envoi et validation
                console.log(`Room ${roomId} state after reveal:`, rooms[roomId]);

                io.to(roomId).emit('roomUpdated', rooms[roomId]);
            }
        });

        socket.on('resetVotes', (roomId) => {
            console.log(`Resetting votes in room ${roomId}`);
            if (rooms[roomId]) {
                rooms[roomId].votes = {};
                rooms[roomId].revealed = false;

                // Log des données avant envoi et validation
                console.log(`Room ${roomId} state after reset:`, rooms[roomId]);

                io.to(roomId).emit('roomUpdated', rooms[roomId]);
            }
        });

        socket.on('disconnect', () => {
            console.log(`🔴 Déconnexion : ${socket.id}`);
        });
    });

    server.listen(3000, () => console.log('🚀 Server ready on http://localhost:3000'));
});
