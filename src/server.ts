import express from "express";
import morgan from "morgan";
import cors from "cors"
import { UserRouter } from "./router/userRouter";
import { ConfigServer } from "./config/config";
import {  DataSource } from "typeorm";

class ServerBootstrap extends ConfigServer{
    public app : express.Application = express() // ademas de tiparlo debemos llamar al metodo express()
    private port:number = this.getNumberEnv('Port')||8000;// esto es para q pueda inicializar en el puerto de prodcution
    private dataSource : DataSource | null = null

    constructor(){
        super();// esto es lo que viene de ConfigServer
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended : true}))
        this.app.use(cors())
        this.app.use(morgan('dev'))

        this.dbConnect()

        this.app.use('/api',this.routers())        
        this.listen()
    }// con la configuracion del contructor inicializamos el servidor 

    routers(): Array<express.Router>{
    return [new UserRouter().router]// aca van los enrutadores con el metodo router, cada uno como un indice del array

    }
    async dbConnect() : Promise<void>{ // connection viene de TypeORM
        this.dataSource = new DataSource(this.typeORMConfig);
        try {
            await this.dataSource.initialize();
            console.log("Conexión a la base de datos establecida con éxito");
        } catch (error) {
            console.error("Error al conectar con la base de datos", error);
        }
    }
    


    public listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servido escuchando en Puerto : ${this.port}`);
            
        }) //para llamar variables dentro de la clase siempre lleva this
    }
}
new ServerBootstrap();