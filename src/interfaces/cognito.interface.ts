import {
  confirmSignUpCognitoInput,
  initiateAuthCognitoInput,
  signUpCognitoInput,
} from "./types";

export interface CognitoServiceInterface {
  confirmSignUp(input: confirmSignUpCognitoInput): Promise<any | Error>;
  initiateAuth(input: initiateAuthCognitoInput): Promise<
    | {
        accessToken: string;
        refreshToken: string;
        idToken: string;
      }
    | Error
  >;
  forgotPassword(input: any): Promise<any | Error>;
  confirmForgotPassword(input: any): Promise<any | Error>;
  signUp(input: signUpCognitoInput): Promise<
    | {
        userid: string;
      }
    | Error
  >;
}
