# AWS Serverless Nodejs architecture

This is with Node.js, TypeScript, Secure Serverless Framework, AWS Lambda, Lambda authorizer, and DynamoDB.

# Lambda authorizer
A **Lambda authorizer** is an API Gateway feature that uses a Lambda function to control access to your API.
The `token-based Lambda authorizer` receives the caller's identity in a bearer JSON Web Token (JWT). 


## Local Development

First, run the following commands in the same order:

```bash
$ pnpm install -g serverless
$ pnpm install
$ pnpm run dynamodb:install
```

To start lambda functions and DynamoDB locally in the offline mode use the following command:

```bash
$ pnpm run sls:offline`
```

To deploy the lambda functions to AWS run the following command:

```bash
$ pnpm run deploy`
```

To remove all resources created on AWS run the following command:

```bash
$ pnpm run remove`
```

#### Local Endpoints

##### Authentication

> For POST requests make sure to include `"Content-Type": "application/json" in the header.

`POST signup -`
[http://localhost:3000/dev/signup](http://localhost:3000/dev/signup)

Example request body:

```
{
    "username": "TestUser",
    "email": "TestUser@gmail.com",
    "password": "123456"
}
```

`POST login -`
[http://localhost:3000/dev/login](http://localhost:3000/dev/login)

Example request body:

```
{
    "email": "TestUser@gmail.com",
    "password": "123456"
}


##### Document Managment

`POST create document -`
[http://localhost:3000/dev/documents/create](http://localhost:3000/dev/task/create)

Example request body:

```
{
    "userId": “123rfedwsf3w45r342w”,
    "name: “Document Name”,
    "templateId": “123rfedwsf3w45r342w”
}
```

`GET get documents ids -`
[http://localhost:3000/dev/documents](http://localhost:3000/dev/document)

`GET get document by id -`
[http://localhost:3000/dev/documents/{id}](http://localhost:3000/dev/document/{id})

## Unit Tests

To run tests

```bash
$ pnpm run test
```
