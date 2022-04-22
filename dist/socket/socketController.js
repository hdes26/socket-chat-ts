"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Socket } = require("socket.io");
const usuarios_1 = __importDefault(require("../models/usuarios"));
const { crearMensaje } = require('../utils/utils');
const Usuario = new usuarios_1.default();
const socketController = (socket = new Socket, io) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on('entrar-chat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                msg: 'El nombre/sala es necesario'
            });
        }
        ;
        socket.join(data.sala);
        Usuario.agregarPersona(socket.id, data.nombre, data.sala);
        socket.broadcast.to(data.sala).emit('listaPersona', Usuario.getPersonasPorSala(data.sala));
        callback(Usuario.getPersonasPorSala(data.sala));
    });
    socket.on('crearMensaje', (data) => {
        let persona = Usuario.getPersona(socket.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        socket.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });
    socket.on('disconnect', () => {
        let personaBorrada = Usuario.borrarPersona(socket.id);
        socket.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`));
        socket.broadcast.to(personaBorrada.sala).emit('listaPersona', Usuario.getPersonasPorSala(personaBorrada.sala));
    });
    //Mensajes privados
    socket.on('mensajePrivado', (data) => {
        let persona = Usuario.getPersona(socket.id);
        socket.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
});
module.exports = {
    socketController
};
//# sourceMappingURL=socketController.js.map