import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { documentService } from "../../services";
import { Document } from "src/model/document-model";

/**
 * @param {}
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const getDocumentsIds = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    const ids = await documentService.getDocumentsIds();
    return formatJSONResponse(200, { ids });
  }
);

/**
 * @param {event} any
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const createDocument = middyfy(
  async (event: any): Promise<APIGatewayProxyResult> => {
    try {
      const newDocument = event.body as Document;
      const document = await documentService.createDocument(newDocument);
      return formatJSONResponse(200, { document });
    } catch (e) {
      return formatJSONResponse(e.statusCode, { error: e });
    }
  }
);

/**
 * @param {event} APIGatewayProxyEvent
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const getDocument = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const document = await documentService.getDocument(id);
      return formatJSONResponse(200, { document });
    } catch (e) {
      return formatJSONResponse(e.statusCode, { error: e });
    }
  }
);
