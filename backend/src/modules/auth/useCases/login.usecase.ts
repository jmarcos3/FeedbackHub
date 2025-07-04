import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { HashService } from 'src/modules/users/services/hash.service';
import { JwtService } from '@nestjs/jwt';
import { USER_ERRORS } from 'src/shared/constants/helpers/userErrors.helpers';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginUserDto) {
    const user = await this.userRepo.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException(USER_ERRORS.invalidsEmail);
    }

    const isPasswordValid = await this.hashService.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException(USER_ERRORS.invalidPassword);
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);
    console.log(token)
    return {
      accessToken: token,
    };
  }
}
