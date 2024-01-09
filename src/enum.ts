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
}

export enum ERROR_MESSAGES {
  CANT_FETCH_ITEMS = "cannot fetch items",
  INVALID_ENDPOINT = "invalid endpoint",
  SERVER_ERROR = "Internal Server Error",
  NO_RESULTS_FOUND = "no results found",
  VALIDATION_ERROR = "invalid request body",
  UNAUTHORIZED = "unauthorized",
  CANT_CREATE_RECORD = "cannot create record",
  INVALID_CHALLENGE = "invalid challenge",
}

export enum ERROR_CODES {
  NOT_AUTHORIZED = 401,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
export enum SUCCESS_CODES {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
}
