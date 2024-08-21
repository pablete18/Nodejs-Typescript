import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity} from "../../customer/entities/customer.entity"


@Entity({
    name : "user"
})
export class UserEntity extends BaseEntity {
    
    @Column()
    username! : string;

    @Column()
    name! : string;

    @Column()
    lastname! : string;

    @Column()// esto quiere decir q puede ser null { nullable : true}
    password! : string;
    
    @Column()
    city! : string;

    @Column()
    province! : string

    @OneToOne(()=> CustomerEntity, (customer)=> customer.user)
    customer! : CustomerEntity
}