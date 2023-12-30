import { hashSecretCognito } from "../utils/hash.util";
import { CognitoService } from "./cognito.service";

export class AuthService {
  private userPoolId = process.env.COGNITO_USER_POOL_ID;
  private clientId = process.env.COGNITO_CLIENT_ID;
  private clientSecret = process.env.COGNITO_CLIENT_SECRET;

  cognito = new CognitoService();

  async userRegistration(email: string, password: string) {
    try {
      const input = {
        ClientId: this.clientId,
        SecretHash: hashSecretCognito(email),
        Username: email,
        Password: password,
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
        ],
      };

      return await this.cognito.signUp(input);
    } catch (err) {
      throw err;
    }
  }

  async confirmSignUp(email: string, code: string) {
    try {
      const input = {
        ClientId: this.clientId,
        ConfirmationCode: code.trim(),
        SecretHash: hashSecretCognito(email),
        Username: email,
      };

      return await this.cognito.confirmSignUp(input);
    } catch (err) {
      throw err;
    }
  }
  async login(email: string, password: string) {
    try {
      const input = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: this.clientId,
        AuthParameters: {
          SECRET_HASH: hashSecretCognito(email),
          USERNAME: email,
          PASSWORD: password,
        },
      };

      return await this.cognito.initiateAuth(input);
    } catch (err) {
      throw err;
    }
  }
}
