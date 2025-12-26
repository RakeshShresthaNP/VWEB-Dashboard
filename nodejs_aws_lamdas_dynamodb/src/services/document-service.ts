import { DataMapper } from "@aws/dynamodb-data-mapper";
import { errorDomain } from "src/utils/error-domain";
import HTTPError from "src/utils/error";

import { Document } from "../model/document-model";

export class DocumentService {
  /**
   *
   * @param mapper
   */
  constructor(private mapper: DataMapper) {}

  /**
   * A function that returns an array of documents ids
   * @param
   * @returns Promise<String[]>
   */
  async getDocumentsIds(): Promise<String[]> {
    try {
      const ids: string[] = [];

      for await (const item of this.mapper.scan(Document)) {
        ids.push(item?.id);
      }
      return ids;
    } catch (error) {
      throw new HTTPError(
        400,
        "Failed to fetch some documents",
        errorDomain.UNKNOWN,
        error
      );
    }
  }

  /**
   *
   * @param document
   * @returns Promise<Document>
   */
  async createDocument(document: Document): Promise<Document> {
    if (!document) {
      throw new HTTPError(400, "missing input", errorDomain.CREATION_ERROR);
    }
    try {
      const documentToSave = Object.assign(new Document(), document);
      return await this.mapper.put(documentToSave);
    } catch (error) {
      throw new HTTPError(
        400,
        "Failed to create the document",
        errorDomain.CREATION_ERROR,
        error
      );
    }
  }

  /**
   *
   * @param id
   * @returns Promise<Document>
   */
  async getDocument(id: string): Promise<Document> {
    try {
      const document = await this.mapper.get(
        Object.assign(new Document(), { id: id })
      );
      return document as Document;
    } catch (error) {
      throw new HTTPError(
        400,
        "document not found",
        errorDomain.NOT_FOUND,
        error
      );
    }
  }
}
