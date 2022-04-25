import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInputDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
