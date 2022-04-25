// import { AuthGuard } from '@nestjs/passport';
import { CreateUserResponseDto } from './../../../../application/create-user/create-user.response.dto';
import { CreateUserService } from './../../../../application/create-user/create-user.service';
import { CreateUserInputDTO } from './create-user.input.dto';
import { routesV1 } from './../../../../../../../routes';
import { SUCCESSFUL_RESPONSE } from './../../../../../../shared/infrastructure/constants/constants';
import { ApiController } from '../../../../../../shared/infrastructure/decorators/api-controller.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, HttpStatus, Post } from '@nestjs/common';

@ApiController(routesV1.version)
@ApiTags('Users')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post(routesV1.users.createUser)
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiOkResponse({
    description: SUCCESSFUL_RESPONSE,
    status: HttpStatus.OK,
    type: String,
  })
  async createUser(
    @Body() params: CreateUserInputDTO,
  ): Promise<CreateUserResponseDto> {
    return this.service.execute(params);
  }
}
