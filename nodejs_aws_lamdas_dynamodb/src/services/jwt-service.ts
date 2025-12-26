import jwt, { JsonWebTokenError } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default class JWTService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor() {
    this.privateKey = Buffer.from(
      process.env.JWT_ACCESS_PRIVATE_KEY,
      "base64"
    ).toString("ascii");
    this.publicKey = Buffer.from(
      process.env.JWT_ACCESS_PUBLIC_KEY,
      "base64"
    ).toString("ascii");
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
