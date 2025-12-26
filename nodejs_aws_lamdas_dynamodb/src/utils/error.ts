import { errorDomain } from "src/utils/error-domain";

export default class HTTPError extends Error {
  statusCode?: number;
  domain?: errorDomain;
  description?: string;
  extra?: any;

  constructor(
    statusCode: number,
    message: string,
    domain?: errorDomain,
    extra?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.statusCode = statusCode;
    this.domain = domain;
    this.description = this.message;
    this.extra = extra || null;

    Error.captureStackTrace(this);
  }
}
