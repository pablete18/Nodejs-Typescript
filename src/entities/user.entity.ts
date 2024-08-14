import { Column, Entity } from "typeorm";
import { BaseEntity } from "../config/base.entity";


@Entity({
    name : "user"
})
export class UserEntity extends BaseEntity {
    
    @Column()
    username! : string;
    @Column()
    name! : string;
    @Column()
    lastnaame! : string;
    @Column({ nullable : true})// esto quiere decir q puede ser null
    jobPosition? : string;
    @Column()
    numberPhone! : number
}