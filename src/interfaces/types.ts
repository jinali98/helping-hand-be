export type confirmSignUpCognitoInput = {
  ClientId: string;
  ConfirmationCode: string;
  SecretHash: string;
  Username: string;
};
export type resendConfirmationCodeInput = {
  ClientId: string;
  SecretHash: string;
  Username: string;
};

export type signUpCognitoInput = {
  ClientId: string;
  SecretHash: string;
  Username: string;
  Password: string;
  UserAttributes: [
    {
      Name: string;
      Value: string;
    }
  ];
};
export type initiateAuthCognitoInput = {
  AuthFlow: "USER_PASSWORD_AUTH";
  ClientId: string;
  AuthParameters: {
    SECRET_HASH: string;
    USERNAME: string;
    PASSWORD: string;
  };
};
