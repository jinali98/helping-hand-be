export enum NODE_ENV {
  PROD = "prod",
  DEV = "dev",
  TEST = "test",
}

export enum STATUS {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  OPEN = "open",
  CLOSED = "closed",
  DRAFT = "draft",
}

export enum STATUS_MESSAGE {
  SUCCESS = "Success",
  ERROR = "Error",
  FAIL = "Fail",
  WARNING = "Warning",
  INFO = "Info",
  UNAUTHORIZED = "Unauthorized",
}

export enum ERROR_MESSAGES {
  CANT_FETCH_ITEMS = "cannot fetch items",
  INVALID_ENDPOINT = "invalid endpoint",
  SERVER_ERROR = "Internal Server Error",
  NO_RESULTS_FOUND = "no results found",
  VALIDATION_ERROR = "invalid request body",
  UNAUTHORIZED = "unauthorized access",
  CANT_CREATE_RECORD = "cannot create record",
  INVALID_CHALLENGE = "invalid challenge",
}

export enum SUCCESS_MESSAGES {
  RECORD_CREATED = "record created successfully",
  RECORD_UPDATED = "record updated successfully",
  RECORD_DELETED = "record deleted successfully",
  RECORD_FETCHED = "record fetched successfully",
  RECORDS_FETCHED = "records fetched successfully",
  SENT_OTP = "OTP sent successfully",
  USER_REGISTERED = "user registered successfully",
  ACCOUNT_CONFIRMED = "account confirmed successfully",
  LOGIN_SUCCESS = "login successful",
  LOGOUT_SUCCESS = "logout successful",
  PASSWORD_CHANGED = "password changed successfully",
  OTP_VERIFIED = "OTP verified successfully",
  EMAIL_SENT = "email sent successfully",
  RESEND_OTP = "OTP resent successfully",
}

export enum ERROR_CODES {
  NOT_AUTHORIZED = 401,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
  INVALID_INPUT = 405,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
export enum SUCCESS_CODES {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
}

export enum USER_TYPE {
  VOLUNTEER = "volunteer",
  ORGANIZATION = "organization",
  ADMIN = "admin",
}
