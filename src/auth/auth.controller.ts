import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')//Parte para categorizar la documentacion del swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
