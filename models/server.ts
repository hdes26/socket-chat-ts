import express, {Application} from 'express';
import cors from 'cors';



class Server {

    private app:Application;
    private port:string;
    private apiPaths = {
        usuarios:'/api/usuarios'
    }


    constructor(){
        this.app  = express();
        this.port = process.env.PORT || '8000';

        //Metodos inciales
        this.middlewares();
    }



    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura del Body
        this.app.use( express.json() );

        //Carpeta publica
        this.app.use( express.static('public') )
    }

   

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }

}

export default Server;