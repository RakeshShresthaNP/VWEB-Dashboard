import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { documentService } from "../../services";
import { Document } from "../../model/document-model";
import HTTPError from "../../utils/error";

/**
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const getDocumentsIds = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    try {
      const ids = await documentService.getDocumentsIds();
      return formatJSONResponse(200, { ids });
    } catch (e) {
      const statusCode = (e as HTTPError)?.statusCode || 500;
      const error = e instanceof Error ? { message: e.message, domain: (e as HTTPError)?.domain } : { message: String(e) };
      return formatJSONResponse(statusCode, { error });
    }
  }
);

/**
 * @param {event} APIGatewayProxyEvent
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const createDocument = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const newDocument = event.body as unknown as Document;
      const document = await documentService.createDocument(newDocument);
      return formatJSONResponse(200, { document });
    } catch (e) {
      const statusCode = (e as HTTPError)?.statusCode || 500;
      const error = e instanceof Error ? { message: e.message, domain: (e as HTTPError)?.domain } : { message: String(e) };
      return formatJSONResponse(statusCode, { error });
    }
  }
);

/**
 * @param {event} APIGatewayProxyEvent
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const getDocument = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id;
    
    if (!id) {
      return formatJSONResponse(400, { error: { message: "Missing document id" } });
    }

    try {
      const document = await documentService.getDocument(id);
      return formatJSONResponse(200, { document });
    } catch (e) {
      const statusCode = (e as HTTPError)?.statusCode || 500;
      const error = e instanceof Error ? { message: e.message, domain: (e as HTTPError)?.domain } : { message: String(e) };
      return formatJSONResponse(statusCode, { error });
    }
  }
);
