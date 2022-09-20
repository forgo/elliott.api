export default interface ResponseErrors {
  [type: string]: {
    message: string;
    error?: Error;
  };
}
