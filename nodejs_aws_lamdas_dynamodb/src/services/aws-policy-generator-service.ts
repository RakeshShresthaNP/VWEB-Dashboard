import { User } from "src/model/user-model";

export type PolicyDocument = {
  Version: string;
  Statement: {
    Action: string;
    Effect: string;
    Resource: string;
  }[];
};

export type AWSAuthResponse = {
  principalId: string | undefined;
  policyDocument: PolicyDocument;
};

export class AwsPolicyGeneratorService {
  /**
   * A function that genrates aws policy with given effect and methodArns
   * Lambda authorizer will use this policy to grant or deny access.
   * @param effect
   * @param methodArn
   * @returns PolicyDocument
   */
  generatePolicyDocument(
    effect: string,
    methodArn: string
  ): PolicyDocument | null {
    if (!effect || !methodArn) return null;

    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: methodArn,
        },
      ],
    };

    return policyDocument;
  }

  /**
   * A function that return a auth reponse to be used by the lambda authorizer
   * @param principal
   * @param methodArn (The methodArn is the ARN of the incoming method request and is populated by API Gateway in accordance with the Lambda authorizer configuration.
)
   * @returns AWSAuthResponse
   */
  generateAuthResponse(principal: User, methodArn: string): AWSAuthResponse {
    const principalId = principal && principal.id ? principal.id : undefined;
    const effect = principal && principal.id ? "Allow" : "Deny";
    const policyDocument = this.generatePolicyDocument(effect, methodArn);

    return {
      principalId,
      policyDocument,
    };
  }
}
