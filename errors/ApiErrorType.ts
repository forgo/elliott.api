enum ApiErrorType {
  // Informational 1xx
  CONTINUE = "CONTINUE", // 100
  SWITCHING_PROTOCOLS = "SWITCHING_PROTOCOLS", // 101

  // Successful 2xx
  OK = "OK", // 200
  CREATED = "CREATED", // 201
  ACCEPTED = "ACCEPTED", // 202
  NON_AUTHORITATIVE_INFORMATION = "NON_AUTHORITATIVE_INFORMATION", // 203
  NO_CONTENT = "NO_CONTENT", // 204
  RESET_CONTENT = "RESET_CONTENT", // 205
  PARTIAL_CONTENT = "PARTIAL_CONTENT", // 206

  // Redirection 3xx
  MULTIPLE_CHOICES = "MULTIPLE_CHOICES", // 300
  MOVED_PERMANENTLY = "MOVED_PERMANENTLY", // 301
  FOUND = "FOUND", // 302
  SEE_OTHER = "SEE_OTHER", // 303
  NOT_MODIFIED = "NOT_MODIFIED", // 304
  USE_PROXY = "USE_PROXY", // 305
  TEMPORARY_REDIRECT = "TEMPORARY_REDIRECT", // 307
  PERMANENT_REDIRECT = "PERMANENT_REDIRECT", // 308

  // Client Error 4xx
  BAD_REQUEST = "BAD_REQUEST", // 400,
  UNAUTHENTICATED = "UNAUTHENTICATED", // 401
  PAYMENT_REQUIRED = "PAYMENT_REQUIRED", // 402
  FORBIDDEN = "FORBIDDEN", // 403
  NOT_FOUND = "NOT_FOUND", // 404
  METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED", // 405
  NOT_ACCEPTABLE = "NOT_ACCEPTABLE", // 406
  PROXY_AUTHENTICATION_REQUIRED = "PROXY_AUTHENTICATION_REQUIRED", // 407
  REQUEST_TIMEOUT = "REQUEST_TIMEOUT", // 408
  CONFLICT = "CONFLICT", // 409
  GONE = "GONE", // 410
  LENGTH_REQUIRED = "LENGTH_REQUIRED", // 411
  PRECONDITION_FAILED = "PRECONDITION_FAILED", // 412
  CONTENT_TOO_LARGE = "CONTENT_TOO_LARGE", // 413
  URI_TOO_LONG = "URI_TOO_LONG", // 414
  UNSUPPORTED_MEDIA_TYPE = "UNSUPPORTED_MEDIA_TYPE", // 415
  RANGE_NOT_SATISFIABLE = "RANGE_NOT_SATISFIABLE", // 416
  EXPECTATION_FAILED = "EXPECTATION_FAILED", // 417
  UNUSED = "UNUSED", // 418
  MISDIRECTED_REQUEST = "MISDIRECTED_REQUEST", // 421
  UNPROCESSABLE_CONTENT = "UNPROCESSABLE_CONTENT", // 422
  UPGRADE_REQUIRED = "UPGRADE_REQUIRED", // 423

  // Server Error 5xx
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR", // 500
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED", // 501
  BAD_GATEWAY = "BAD_GATEWAY", // 502
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE", // 503
  GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT", // 504
  HTTP_VERSION_NOT_SUPPORTED = "HTTP_VERSION_NOT_SUPPORTED", // 505
}

export default ApiErrorType;