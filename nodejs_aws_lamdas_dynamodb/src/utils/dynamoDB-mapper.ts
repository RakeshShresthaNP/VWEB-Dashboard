import { DataMapper } from "@aws/dynamodb-data-mapper";
import DynamoDB from "aws-sdk/clients/dynamodb";
import * as dotenv from "dotenv";

dotenv.config();

const dynamoDBOfflineOptions: DynamoDB.ClientConfiguration = {
  region: "localhost",
  endpoint: "http://localhost:5000/",
};

const dynamoMapper = new DataMapper({
  client: process.env.IS_OFFLINE
    ? new DynamoDB(dynamoDBOfflineOptions)
    : new DynamoDB(),
});

export default dynamoMapper;
