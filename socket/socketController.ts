const { Socket } = require("socket.io");
import Usuarios from "../models/usuarios";
const {crearMensaje} = require('../utils/utils')

const Usuario = new Usuarios();

const socketController = async (socket = new Socket, io: any) => {

    socket.on('entrar-chat', (data: any, callback: any) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                msg: 'El nombre/sala es necesario'
            });
        };
        
        socket.join(data.sala);

        Usuario.agregarPersona(socket.id, data.nombre, data.sala);

        socket.broadcast.to(data.sala).emit('listaPersona', Usuario.getPersonasPorSala(data.sala));

        socket.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió`));

        callback(Usuario.getPersonasPorSala(data.sala));

    });

    socket.on('crearMensaje', (data:any, callback:any)=>{

        let persona = Usuario.getPersona(socket.id);

        
        let mensaje = crearMensaje( persona.nombre, data.mensaje );

        socket.broadcast.to(persona.sala).emit('crearMensaje', mensaje );

        callback(mensaje)
    })

    socket.on('disconnect', () => {
       let personaBorrada:any =  Usuario.borrarPersona(socket.id);

       socket.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`));

       socket.broadcast.to(personaBorrada.sala).emit('listaPersona', Usuario.getPersonasPorSala(personaBorrada.sala));

    });

    //Mensajes privados
    socket.on('mensajePrivado', (data:any) => {

        let persona = Usuario.getPersona(socket.id);

        socket.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje ));

     });

}

module.exports = {
    socketController
}