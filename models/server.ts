import express, {Application} from 'express';
import cors from 'cors';
import {createServer} from 'http';

const  {socketController}  = require('../socket/socketController');

class Server {

    private app:Application;
    private port:string;
    private apiPaths = {
        usuarios:'/api/usuarios'
    }
    private io:any;
    private server:any;


    constructor(){
        this.app  = express();
        this.port = process.env.PORT || '8000';
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);

        //Metodos inciales
        this.middlewares();

        //socket
        this.sockets();
    }



    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura del Body
        this.app.use( express.json() );

        //Carpeta publica
        this.app.use( express.static('public') )
    }

    sockets(){
        this.io.on('connection', (socket:any)=>socketController(socket, this.io));
    }

    listen(){
        this.server.listen( this.port, ()=>{
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }

}

export default Server;