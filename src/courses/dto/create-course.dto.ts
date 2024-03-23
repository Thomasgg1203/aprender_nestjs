import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty() //uso para que salga el esquema en la documentacion
  @IsNotEmpty()
  title: string;

  @ApiProperty() //cada uno, para que se muestre
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Se describe la parte del uso del curso',
    minimum: 1,
    default: 1,
    maxLength: 15,
    minLength: 1,
  }) //Parte para validar y dar una información más clara posible
  @Length(1, 15) //aqui se valida la parte de longitud
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  cover: string;
}
