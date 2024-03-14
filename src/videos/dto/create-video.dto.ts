//Parte para la validación del sistema en cuanto al CRUD
import { IsNotEmpty, IsUrl, Length } from "class-validator";

export class CreateVideoDto {

    @IsNotEmpty()
    @Length(1, 15)
    title: String;
    
    @IsNotEmpty()
    @Length(1, 15)
    description: string;

    @IsUrl()
    src: string;

    //La parte de las validaciónes. 
    //Se puede encontrar en la parte de la documentación de nestJS
}
