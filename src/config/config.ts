import * as dotenv from "dotenv"// con el astericso sed llama todo lo de la dependencia

export abstract class ConfigServer {// // una clase abstracta no se puede instanciar, solo se puede inicializar o extender como una herencia
    constructor(){

        const nodeNameEnv = this.createPathEnv(this.nodeEnv)
        dotenv.config({
            path : nodeNameEnv
        })

    }
    public getEnviroment(k : string): string | undefined{
        return process.env[k]// el key de la variable es dinamico 
    }

    public getNumberEnv(k:string): number {
        return Number(this.getEnviroment(k))
    }

    public get nodeEnv(): string {
        return this.getEnviroment('NODE_ENV')?.trim() || ""
    }

    public createPathEnv(path : string) : string {
        const arrEnv : string [] = ['env']

        if(path.length > 0){
            const stringToArray  = path.split('.')
            arrEnv.unshift(...stringToArray)
        }

        return "." + arrEnv.join('.')
    }
}

