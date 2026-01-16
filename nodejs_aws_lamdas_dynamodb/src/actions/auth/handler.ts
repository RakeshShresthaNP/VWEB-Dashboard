import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { User } from "../../model/user-model";
import { awsPolicyService, jwtService, userService } from "../../services";
import { CreateUserInput, LoginInput } from "../../services/user-service";
import HTTPError from "../../utils/error";

// Custom types for Lambda authorizer
type AuthorizerEvent = {
  authorizationToken?: string;
  methodArn: string;
};

type AuthorizerResult = {
  principalId?: string;
  policyDocument: {
    Version: string;
    Statement: {
      Action: string;
      Effect: string;
      Resource: string;
    }[];
  };
};

export const verifyToken = async function (
  event: AuthorizerEvent
): Promise<AuthorizerResult> {
  try {
    const token = event.authorizationToken?.replace("Bearer ", "") || "";
    const methodArn = event.methodArn;

    if (!token) {
      throw new HTTPError(401, "Missing authorization token", undefined);
    }

    // verifies token
    const decoded: User = jwtService.verifyJwtToken<User>(token);

    // generate aws policy and return the auth response
    return awsPolicyService.generateAuthResponse(decoded, methodArn);
  } catch (e) {
    const statusCode = (e as HTTPError)?.statusCode || 500;
    const error = e instanceof Error ? e.message : String(e);
    return formatJSONResponse(statusCode, { error }) as any;
  }
};

export const signUp = middyfy(async function (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const newUserInput = event.body as unknown as CreateUserInput;
    const data = await userService.signUp(newUserInput);
    return formatJSONResponse(200, { data });
  } catch (e) {
    const statusCode = (e as HTTPError)?.statusCode || 500;
    const error = e instanceof Error ? { message: e.message, domain: (e as HTTPError)?.domain } : { message: String(e) };
    return formatJSONResponse(statusCode, { error });
  }
});

export const logIn = middyfy(async function (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const creds = event.body as unknown as LoginInput;
    const data = await userService.login(creds);
    return formatJSONResponse(200, { data });
  } catch (e) {
    const statusCode = (e as HTTPError)?.statusCode || 500;
    const error = e instanceof Error ? { message: e.message, domain: (e as HTTPError)?.domain } : { message: String(e) };
    return formatJSONResponse(statusCode, { error });
  }
});
