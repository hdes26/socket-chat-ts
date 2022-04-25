var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');

//referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');



//Funciones para renderizar mensajes

const renderizarMensajes = (mensaje, yo) => {//[{},{},{}]
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += `<li class="reverse">
        <div class="chat-content">
                <h5>${mensaje.nombre} </h5>
                <iv class="box bg-light-inverse">${mensaje.mensaje} </div>
                   </div>
               <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
           <div class="chat-time">${hora} </div>
        </li >`
    }
    else {
        if (mensaje.nombre !== 'Administrador') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user"/> </div>'
        }
        html += `<li class="animated fadeIn">

                    <div class="chat-content">
                        <h5>${mensaje.nombre} </h5>
                    <div class="box bg-light-${adminClass}">${mensaje.mensaje} </div>
                      </div>
                    <div class="chat-time">${hora} </div>
              </li> `
    }

    divChatbox.append(html);
}
//Funciones para renderizar usuarios

const renderizarUsuarios = (personas) => {//[{},{},{}]

    var html = '';
    html += `<li>
        <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('sala')} </span></a>
            </li>`

    for (const persona of personas) {
        html += `<li>
             <a data-id=${persona.id} href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${persona.nombre} <small class="text-success">online</small></span></a>
         </li>`
    }

    divUsuarios.html(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//Listeners
divUsuarios.on('click', 'a', function () {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }

});

formEnviar.on('submit', function (e) {
    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }
    //Enviar informacion
    socket.emit('crearMensaje', { mensaje: txtMensaje.val() }, (mensaje) => {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });
});



