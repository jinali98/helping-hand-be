# Helping Hand - Volunteer Management Platform

The Helping Hand platform facilitates volunteer management, allowing volunteers to sign up and engage in activities hosted by organizations registered on the platform.

## Other Related Repositories

[infrastructure Configuration - Helping Hand](https://github.com/jinali98/helping-hand-infra)

## Technologies Used

This project utilizes the following technologies:

- Node.js
- TypeScript
- MongoDB
- AWS Cognito
- Redis
- Swagger OPEN API
- Docker
- JEST

## API Reference

API documentation is generated using Swagger OPEN API.

Access the documentation at http://localhost:3000/api-docs after starting the application.

## Configurations

1. Configure environment variables:

Create a .env file in the project root and set the necessary variables

PORT=3000
MONGO_URL=mongodb-url
MONGO_PASSWORD=mongodb-password
MONGO_USERNAME=mongodb-username
AWS_REGION=aws-region
COGNITO_USER_POOL_ID=cognito-user-pool-id
COGNITO_CLIENT_ID=cognito-client-id
COGNITO_CLIENT_SECRET=cognito-client-secret
