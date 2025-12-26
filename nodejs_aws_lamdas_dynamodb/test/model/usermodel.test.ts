import { expect } from "chai";
import { User } from "../../src/model/user-model";
import { MockUserData } from "../mocks/mock-user";

describe("UserModel", async () => {
  describe("After hashing user's passowrd, compare it with the plain passsword", async () => {
    it("should return true", async () => {
      const instance = Object.assign(new User(), MockUserData);
      await instance.hashPassword();
      const passwordMatch = await instance.comparePassword(
        MockUserData.password as string
      );
      expect(passwordMatch).to.be.true;
    });
  });

  describe("Make email Lowercase", async () => {
    it("email should be lowercase", async () => {
      const instance = Object.assign(new User(), MockUserData);
      const lowercase = instance.email.toLowerCase();
      instance.setEmail();

      expect(instance.email).to.equal(lowercase);
    });
  });
});
