import jwt, { JsonWebTokenError } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default class JWTService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor() {
    const privateKeyEnv = process.env.JWT_ACCESS_PRIVATE_KEY;
    const publicKeyEnv = process.env.JWT_ACCESS_PUBLIC_KEY;

    if (!privateKeyEnv || !publicKeyEnv) {
      throw new Error(
        "JWT_ACCESS_PRIVATE_KEY and JWT_ACCESS_PUBLIC_KEY must be set in environment variables"
      );
    }

    this.privateKey = Buffer.from(privateKeyEnv, "base64").toString("ascii");
    this.publicKey = Buffer.from(publicKeyEnv, "base64").toString("ascii");
  }

  /**
   *
   * @param {Object} object
   * @returns {string} token
   */
  signJwtToken(object: Object, options?: jwt.SignOptions | undefined): string {
    try {
      const token = jwt.sign(
        JSON.parse(JSON.stringify(object)),
        this.privateKey,
        {
          ...(options && options),
          algorithm: "RS256",
          allowInsecureKeySizes: true,
        }
      );
      return token;
    } catch (e: any) {
      throw new JsonWebTokenError(e);
    }
  }

  /**
   *
   * @param {string} token
   * @returns {T} object
   */
  verifyJwtToken<T>(token: string): T {
    try {
      const decoded = jwt.verify(token, this.publicKey) as T;
      return decoded;
    } catch (e: any) {
      throw new JsonWebTokenError(e);
    }
  }
}
