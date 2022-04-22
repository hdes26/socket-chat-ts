"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mensaje {
    constructor(uid, nombre, mensaje) {
        this.uid = uid;
        this.nombre = nombre;
        this.mensaje = mensaje;
        this.fecha = new Date().getTime();
    }
}
class ChatMensajes {
    constructor() {
        this.mensajes = [];
        this.usuarios = {};
    }
    get ultimos10() {
        this.mensajes = this.mensajes.splice(0, 10);
        return this.mensajes;
    }
    get usuarioArr() {
        return Object.values(this.usuarios);
    }
    enviarMensaje(uid, nombre, mensaje) {
        this.mensajes.unshift(new Mensaje(uid, nombre, mensaje));
    }
}
exports.default = ChatMensajes;
//# sourceMappingURL=chat-mensajes.js.map