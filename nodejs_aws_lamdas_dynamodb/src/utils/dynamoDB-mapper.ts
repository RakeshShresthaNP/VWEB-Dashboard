import { DataMapper } from "@aws/dynamodb-data-mapper";
import DynamoDB from "aws-sdk/clients/dynamodb";
import * as dotenv from "dotenv";

dotenv.config();

const dynamoDBOfflineOptions: DynamoDB.ClientConfiguration = {
  region: "localhost",
  endpoint: "http://127.0.0.1:5000", // Changed to 127.0.0.1 for Windows stability
  // These lines are CRITICAL to stop the UnrecognizedClientException
  accessKeyId: "LOCALID123", 
  secretAccessKey: "LOCALSECRET123"
};

const dynamoMapper = new DataMapper({
  client: process.env.IS_OFFLINE
    ? new DynamoDB(dynamoDBOfflineOptions)
    : new DynamoDB(),
});

export default dynamoMapper;