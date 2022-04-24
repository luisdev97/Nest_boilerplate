import { SUCCESSFUL_RESPONSE } from './../../../../../../shared/infrastructure/constants/constants';
import { routesV1 } from './../../../../../../../routes';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ApiController } from 'src/modules/shared/infrastructure/decorators/api-controller.decorator';
import { LoginService } from './../../../../application/login/login.service';
import { Body, HttpStatus, Post } from '@nestjs/common';
import { LoginInputDto } from './login.input.dto';
import { LoginResponseDto } from 'src/modules/auth/src/application/login/login.response.dto';

@ApiController(routesV1.version)
@ApiTags('Users')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post(routesV1.auth.login)
  @ApiOperation({ summary: 'Create a session for the user.' })
  @ApiOkResponse({
    description: SUCCESSFUL_RESPONSE,
    status: HttpStatus.OK,
    type: LoginInputDto,
  })
  async login(@Body() params: LoginInputDto): Promise<LoginResponseDto> {
    const response = await this.service.execute(params);
    return response;
  }
}
