import { Router } from "express";

export class BaseRouter<T> { // El generico T es de los controladores
    public router : Router;
    public controller : T
    //public middleware : U

    constructor(TController : {new () : T}){// 
        this.router = Router()
        this.controller = new TController()
        this.routes()
    }

    routes(){}
    
}