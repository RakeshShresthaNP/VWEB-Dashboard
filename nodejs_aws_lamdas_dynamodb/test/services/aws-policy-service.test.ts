import { expect } from "chai";
import { AwsPolicyGeneratorService } from "../../src/services/aws-policy-generator-service";
import { User } from "../../src/model/user-model";
import { MockUserData } from "../mocks/mock-user";

const mockUser = Object.assign(new User(), MockUserData);
const methodArn =
  "arn:aws:execute-api:us-east-1:123456789012:abcdef123/test/GET/request";

describe("AwsPolicyGeneratorService", async () => {
  context("Genrate access policy for given user and methodArn", async () => {
    it("should return an access policy with 'Allow effect if a princple is passed", async () => {
      const policy = new AwsPolicyGeneratorService().generateAuthResponse(
        mockUser,
        methodArn
      );
      expect(policy).to.have.property("principalId");
      expect(policy).to.have.property("policyDocument");
      expect(policy.principalId).to.be.equal(mockUser.id);
      expect(policy.policyDocument.Statement[0].Effect).to.be.equal("Allow");
      expect(policy.policyDocument.Statement[0].Resource).to.be.equal(
        methodArn
      );
    });

    it("should return an access policy with 'Deny' effect if a princple is not passed", async () => {
      const policy = new AwsPolicyGeneratorService().generateAuthResponse(
        undefined,
        methodArn
      );
      expect(policy).to.have.property("principalId");
      expect(policy).to.have.property("policyDocument");
      expect(policy.principalId).to.be.undefined;
      expect(policy.policyDocument.Statement[0].Effect).to.be.equal("Deny");
      expect(policy.policyDocument.Statement[0].Resource).to.be.equal(
        methodArn
      );
    });
  });
});
