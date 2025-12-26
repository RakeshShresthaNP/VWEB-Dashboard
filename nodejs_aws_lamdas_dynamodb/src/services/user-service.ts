import HTTPError from "src/utils/error";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { ConditionExpressionPredicate } from "@aws/dynamodb-expressions";
import { errorDomain } from "src/utils/error-domain";
import { User } from "src/model/user-model";
import JWTService from "./jwt-service";

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export class UserService {
  /**
   *
   * @param mapper
   * @param authService
   */
  constructor(private mapper: DataMapper, private authService: JWTService) {}

  /**
   *
   * @param {CreateUserInput} input
   * @returns user
   */
  async signUp(input: CreateUserInput): Promise<any> {
    try {
      // Check emptyness of the incoming data
      if (!input?.username || !input?.email || !input?.password) {
        throw new HTTPError(
          400,
          "Some required fields missing",
          errorDomain.VALIDATION_ERROR
        );
      }

      // create a new user
      const userObj: User = Object.assign(new User(), input);
      // hash it's password
      await userObj.hashPassword();
      // change email to lower case
      userObj.setEmail();

      // prevent overwritting same record if it exists
      let equalsExpressionPredicate: ConditionExpressionPredicate = {
        type: "NotEquals",
        object: input.email,
      };

      let user: User;
      try {
        user = await this.mapper.put(userObj, {
          condition: { ...equalsExpressionPredicate, subject: "email" },
        });
      } catch (error) {
        throw new HTTPError(
          400,
          "Email already exists",
          errorDomain.CREATION_ERROR
        );
      }

      return { user: user };
    } catch (error: any) {
      throw new HTTPError(
        400,
        error.message,
        errorDomain.CREATION_ERROR,
        error
      );
    }
  }

  /**
   *
   * @param {string} email
   * @returns user
   */
  async getUserByEmail(email: string) {
    email = email.trim().toLowerCase();
    const params: User = Object.assign(new User(), { email: email });
    const user = await this.mapper.get(params);
    return user;
  }

  /**
   *
   * @param {LoginInput} input
   * @returns user, access_token
   */
  async login(input: LoginInput): Promise<any> {
    const errorMsg = "Invalid email or password";

    // Get our user by email
    const user: User = await this.getUserByEmail(input.email);

    // if there is no user, throw an authentication error
    if (!user) {
      throw new HTTPError(401, errorMsg, errorDomain.FORBIDDEN);
    }

    // validate the password
    const passwordIsValid = await user.comparePassword(input.password);
    if (!passwordIsValid) {
      throw new HTTPError(401, errorMsg, errorDomain.FORBIDDEN);
    }

    // sign a jwt
    const access_token = this.authService.signJwtToken(user);

    // return token
    return {
      user: user,
      access_token: access_token,
    };
  }
}
