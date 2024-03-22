//Parte para la validación del sistema en cuanto al CRUD
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl, Length } from "class-validator";

export class CreateVideoDto {

    @ApiProperty()
    @IsNotEmpty()
    @Length(1, 15)
    title: String;
    
    @IsNotEmpty()
    @Length(1, 15)
    description: string;

    @IsUrl()
    src: string;

    //Parte de la integración de la
    // @ApiProperty({ type: 'string', format: 'binary' })
    // file: any;
    //La parte de las validaciónes. 
    //Se puede encontrar en la parte de la documentación de nestJS
}
