import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";
import { User } from "src/model/user-model";
import { awsPolicyService, jwtService, userService } from "src/services";
import { CreateUserInput, LoginInput } from "src/services/user-service";

export const verifyToken = async function (event: any): Promise<any> {
  try {
    const token = event.authorizationToken?.replace("Bearer ", "");
    const methodArn = event.methodArn;

    // verifies token
    const decoded: User = jwtService.verifyJwtToken<User>(token);

    // generate aws policy and return the auth respone
    return awsPolicyService.generateAuthResponse(decoded, methodArn);
  } catch (e) {
    return formatJSONResponse(e.statusCode, { error: e });
  }
};

export const signUp = middyfy(async function (
  event: any
): Promise<APIGatewayProxyResult> {
  try {
    const newUserInput = event.body as CreateUserInput;
    const data = await userService.signUp(newUserInput);
    return formatJSONResponse(200, { data });
  } catch (e) {
    return formatJSONResponse(e.statusCode, { error: e });
  }
});

export const logIn = middyfy(async function (
  event: any
): Promise<APIGatewayProxyResult> {
  try {
    const creds = event.body as LoginInput;
    const data = await userService.login(creds);
    return formatJSONResponse(200, { data });
  } catch (e) {
    return formatJSONResponse(e.statusCode, { error: e });
  }
});
