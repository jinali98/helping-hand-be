export interface AuthServiceInterface {
  volunteerRegistration(email: string, password: string): Promise<any | Error>;
  organizationRegistration(data): Promise<any | Error>;
  forgotPasswordHandler(data): Promise<any | Error>;
  confirmForgotPasswordHandler(data): Promise<any | Error>;
}
