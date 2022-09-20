import ResponseErrors from "./ResponseErrors.ts";

export default interface Response<T> {
  status: number;
  body: {
    success: boolean;
    data?: T;
    errors?: ResponseErrors;
  };
}
