"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const { socketController } = require('../socket/socketController');
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.server = (0, http_1.createServer)(this.app);
        this.io = require('socket.io')(this.server);
        //Metodos inciales
        this.middlewares();
        //socket
        this.sockets();
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura del Body
        this.app.use(express_1.default.json());
        //Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map