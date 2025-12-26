import {
  attribute,
  table,
  hashKey,
} from "@aws/dynamodb-data-mapper-annotations";
import { nanoid } from "nanoid";
import { compare, hash } from "bcrypt-ts";

@table("user_table")
export class User {
  @attribute({ defaultProvider: () => nanoid() })
  id: string;

  @attribute({ type: "String" })
  username: string;

  @hashKey({ type: "String" })
  email: string;

  @attribute({ type: "String" })
  password: string;

  @attribute({
    type: "Date",
    defaultProvider: () => new Date(),
  })
  createdAt?: Date;

  async hashPassword() {
    this.password = await hash(this.password, 8);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  setEmail() {
    this.email = this.email.trim().toLowerCase();
  }
}
