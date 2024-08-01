import express from "express";
import morgan from "morgan";
import cors from "cors"

class ServerBootstrap {
    public app : express.Application = express() // ademas de tiparlo debemos llamar al metodo express()
    private port:number = 8000;

    constructor(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended : true}))
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.listen()
    }// con la configuracion del contructor inicializamos el servidor 


    public listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servido escuchando en Puerto : ${this.port}`);
            
        }) //para llamar variables dentro de la clase siempre lleva this
    }
}
new ServerBootstrap();