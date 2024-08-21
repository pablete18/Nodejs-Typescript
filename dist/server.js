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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./user/userRouter");
const config_1 = require("./config/config");
const typeorm_1 = require("typeorm");
class ServerBootstrap extends config_1.ConfigServer {
    constructor() {
        super(); // esto es lo que viene de ConfigServer
        this.app = (0, express_1.default)(); // ademas de tiparlo debemos llamar al metodo express()
        this.port = this.getNumberEnv('Port') || 8000; // esto es para q pueda inicializar en el puerto de prodcution
        this.dataSource = null;
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.dbConnect();
        this.app.use('/api', this.routers());
        this.listen();
    } // con la configuracion del contructor inicializamos el servidor 
    routers() {
        return [new userRouter_1.UserRouter().router]; // aca van los enrutadores con el metodo router, cada uno como un indice del array
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataSource = new typeorm_1.DataSource(this.typeORMConfig);
            try {
                yield this.dataSource.initialize();
                console.log("Conexión a la base de datos establecida con éxito");
            }
            catch (error) {
                console.error("Error al conectar con la base de datos", error);
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servido escuchando en Puerto : ${this.port}`);
        }); //para llamar variables dentro de la clase siempre lleva this
    }
}
new ServerBootstrap();
