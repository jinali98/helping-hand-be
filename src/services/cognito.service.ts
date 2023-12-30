import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { CustomError } from "./exception.service";

export class CognitoService {
  cognitoClient: CognitoIdentityProviderClient;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
    });
  }

  async confirmSignUp(input) {
    try {
      const authChallenge = new ConfirmSignUpCommand(input);
      const response = await this.cognitoClient.send(authChallenge);

      return response;
    } catch (err) {
      console.error(err);
      throw new CustomError(err.$metadata.httpStatusCode, err.message);
    }
  }

  async initiateAuth(input) {
    try {
      const initAuth = new InitiateAuthCommand(input);
      const response = await this.cognitoClient.send(initAuth);

      return {
        accessToken: response.AuthenticationResult.AccessToken,
        refreshToken: response.AuthenticationResult.RefreshToken,
        idToken: response.AuthenticationResult.IdToken,
      };
    } catch (err) {
      console.error(err);
      throw new CustomError(err.$metadata.httpStatusCode, err.message);
    }
  }

  async signUp(input) {
    try {
      const createUser = new SignUpCommand(input);
      const response = await this.cognitoClient.send(createUser);

      if (response.$metadata.httpStatusCode === 200) {
        return {
          userid: response.UserSub,
        };
      }
    } catch (err) {
      throw new CustomError(err.$metadata.httpStatusCode, err.message);
    }
  }

  async forgotPassword(input) {
    try {
      const codeRequest = new ForgotPasswordCommand(input);
      const response = await this.cognitoClient.send(codeRequest);
      return response;
    } catch (err) {
      throw new CustomError(err.$metadata.httpStatusCode, err.message);
    }
  }

  async confirmForgotPassword(input) {
    try {
      const codeRequest = new ConfirmForgotPasswordCommand(input);
      const response = await this.cognitoClient.send(codeRequest);
      return response;
    } catch (err) {
      console.error(err);
      throw new CustomError(err.$metadata.httpStatusCode, err.message);
    }
  }
}
