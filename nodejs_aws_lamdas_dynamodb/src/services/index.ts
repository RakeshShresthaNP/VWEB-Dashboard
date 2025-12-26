import dynamoMapper from "../utils/dynamoDB-mapper";
import { DocumentService } from "./document-service";
import { UserService } from "./user-service";
import { AwsPolicyGeneratorService } from "./aws-policy-generator-service";
import JWTService from "./jwt-service";

export const jwtService = new JWTService();
export const awsPolicyService = new AwsPolicyGeneratorService();
export const documentService = new DocumentService(dynamoMapper);
export const userService = new UserService(dynamoMapper, jwtService);
