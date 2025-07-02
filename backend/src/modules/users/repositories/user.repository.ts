import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { usersTable } from "src/shared/database/tables";
import { eq } from "drizzle-orm";
import { ulid } from "ulid";
import { DatabaseService } from "src/shared/database/database.service";

@Injectable()
export class UserRepository {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  // 🔽 Getter para o DB
  private get db() {
    return this.databaseService.getDb();
  }

  async findByEmail(email: string) {
    const user = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user[0];
  }

  async createAdmin(dto: CreateUserDto, hashedPassword: string) {
    
    const bodyToCreate = {
      id: ulid(),
      username: dto.username,
      email: dto.email,
      passwordHash: hashedPassword,
      createdAt: new Date(),
    };

    const newUser = await this.db.insert(usersTable).values(bodyToCreate);
    return newUser;
  }
}
