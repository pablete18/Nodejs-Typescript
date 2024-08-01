"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./router/userRouter");
class ServerBootstrap {
    constructor() {
        this.app = (0, express_1.default)(); // ademas de tiparlo debemos llamar al metodo express()
        this.port = 8000;
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use('/api', this.routers());
        this.listen();
    } // con la configuracion del contructor inicializamos el servidor 
    routers() {
        return [new userRouter_1.UserRouter().router]; // aca van los enrutadores con el metodo router, cada uno como un indice del array
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servido escuchando en Puerto : ${this.port}`);
        }); //para llamar variables dentro de la clase siempre lleva this
    }
}
new ServerBootstrap();
