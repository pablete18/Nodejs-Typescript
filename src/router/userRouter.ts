import { UserController } from "../controllers/userController"
import { BaseRouter } from "./router"

export class UserRouter extends BaseRouter<UserController>{// se pasa Usercontrollero como Gerenerico ya configurado en el enrutador
    constructor(){
        super(UserController)// las propiedaades heredadas son de UserController
    }
    routes(): void {
        this.router.get('/user',(req,res)=> this.controller.getUsers(req,res))
    }
}