import { LoginResponseDto } from './../../../../application/login/login.response.dto';
import { SUCCESSFUL_RESPONSE } from './../../../../../../shared/infrastructure/constants/constants';
import { routesV1 } from './../../../../../../../routes';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { LoginService } from './../../../../application/login/login.service';
import { Body, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginInputDto } from './login.input.dto';
import { Response } from 'express';
import { ApiController } from '../../../../../../shared/infrastructure/decorators/api-controller.decorator';

@ApiController(routesV1.version)
@ApiTags('Users')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post(routesV1.auth.login)
  @ApiOperation({ summary: 'Create a session for the user.' })
  @ApiOkResponse({
    description: SUCCESSFUL_RESPONSE,
    status: HttpStatus.OK,
    type: LoginResponseDto,
  })
  async login(
    @Body() params: LoginInputDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const token = await this.service.execute(params);
    res.cookie('jwt', token, { httpOnly: true });
    return { messagge: 'success' };
  }
}
