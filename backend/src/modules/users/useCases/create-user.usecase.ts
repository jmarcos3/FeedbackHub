import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { HashService } from "../services/hash.service";
import { UserRepository } from "../repositories/user.repository";
import { USER_SUCESSFULL } from "src/shared/constants/helpers/userSucess.helpers";
import { USER_ERRORS } from "src/shared/constants/helpers/userErrors.helpers";

@Injectable()
export class CreateUserUseCase{
  constructor(
    private readonly hashService: HashService,
    private readonly userRepo: UserRepository,
  ){}


  async execute(createUserDto: CreateUserDto){

    const checkUserExists = await this.userRepo.findByEmail(createUserDto.email)

    if (!checkUserExists){
      const hashedPassword = await this.hashService.hash(createUserDto.password)
      await this.userRepo.createAdmin(createUserDto,hashedPassword)

      return {message: USER_SUCESSFULL.sucessfullCreated}
    }

    throw new ConflictException(USER_ERRORS.userAlreadyExists)
  }
}