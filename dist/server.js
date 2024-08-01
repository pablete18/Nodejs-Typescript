"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class ServerBootstrap {
    constructor() {
        this.app = (0, express_1.default)(); // ademas de tiparlo debemos llamar al metodo express()
        this.port = 8000;
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.get("/api", (req, res) => {
            res.status(200).json({
                message: "Hola Mundo"
            });
        });
        this.listen();
    } // con la configuracion del contructor inicializamos el servidor 
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servido escuchando en Puerto : ${this.port}`);
        }); //para llamar variables dentro de la clase siempre lleva this
    }
}
new ServerBootstrap();
