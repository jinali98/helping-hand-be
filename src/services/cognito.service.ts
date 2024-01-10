import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { CustomError } from "./exception.service";
import { CognitoServiceInterface } from "../interfaces/cognito.interface";
import {
  confirmSignUpCognitoInput,
  initiateAuthCognitoInput,
  resendConfirmationCodeInput,
  signUpCognitoInput,
} from "../interfaces/types";

export class CognitoService implements CognitoServiceInterface {
  cognitoClient: CognitoIdentityProviderClient;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
    });
  }

  async confirmSignUp(input: confirmSignUpCognitoInput) {
    try {
      const authChallenge = new ConfirmSignUpCommand(input);
      const response = await this.cognitoClient.send(authChallenge);

      return response;
    } catch (err) {
      throw new CustomError(
        err.$metadata.httpStatusCode,
        err.message,
        err.__type
      );
    }
  }
  async resendConfirmationCode(input: resendConfirmationCodeInput) {
    try {
      const authChallenge = new ResendConfirmationCodeCommand(input);
      const response = await this.cognitoClient.send(authChallenge);

      return response;
    } catch (err) {
      throw new CustomError(
        err.$metadata.httpStatusCode,
        err.message,
        err.__type
      );
    }
  }

  async initiateAuth(input: initiateAuthCognitoInput) {
    try {
      const initAuth = new InitiateAuthCommand(input);
      const response = await this.cognitoClient.send(initAuth);

      return {
        accessToken: response.AuthenticationResult.AccessToken,
        refreshToken: response.AuthenticationResult.RefreshToken,
        idToken: response.AuthenticationResult.IdToken,
      };
    } catch (err) {
      throw new CustomError(
        err.$metadata.httpStatusCode,
        err.message,
        err.__type
      );
    }
  }

  async signUp(input: signUpCognitoInput) {
    try {
      const createUser = new SignUpCommand(input);
      const response = await this.cognitoClient.send(createUser);

      if (response.$metadata.httpStatusCode === 200) {
        return {
          userid: response.UserSub,
        };
      }
    } catch (err) {
      throw new CustomError(
        err.$metadata.httpStatusCode,
        err.message,
        err.__type
      );
    }
  }

  async forgotPassword(input) {
    try {
      const codeRequest = new ForgotPasswordCommand(input);
      const response = await this.cognitoClient.send(codeRequest);
      return response;
    } catch (err) {
      throw new CustomError(
        err.$metadata.httpStatusCode,
        err.message,
        err.__type
      );
    }
  }

  async confirmForgotPassword(input) {
    try {
      const codeRequest = new ConfirmForgotPasswordCommand(input);
      const response = await this.cognitoClient.send(codeRequest);
      return response;
    } catch (err) {
      throw new CustomError(
        err.$metadata.httpStatusCode,
        err.message,
        err.__type
      );
    }
  }
}
