const socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}


socket.on('connect', () => {
    console.log('Sockets online');

    socket.emit('entrar-chat', usuario, (resp) => {

        console.log('Usuario conectados', resp);

    });
});


//Enviar informacion
/* socket.emit('crearMensaje',{
    mensaje:'Hola mundo'
    }(resp) => { console.log('Usuario conectados',resp);}); 
    */

//Escuchar informacion
socket.on('crearMensaje', (mensaje) => {
    console.log('Servidor', mensaje)
});

//Escuchar cambios de usuario
//Cuando un usuario sale y entra del chat
socket.on('listaPersona', (personas) => {
    console.log(personas)
});

//Mensajes privados
socket.on('mensajePrivado', (mensaje)=>{
    console.log('Mensaje privado', mensaje)
});