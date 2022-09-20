class ApiError extends Error {
  readonly context?: Record<string, unknown>;

  // base constructor only accepts string message as an argument
  // we extend it here to accept an object, allowing us to pass other data
  constructor({
    context,
    name,
    message,
  }: {
    context?: Record<string, unknown>;
    name: Error["name"];
    message: Error["message"];
  }) {
    super(message);
    this.name = name; // this property is defined in parent
    this.context = context;
  }
}

export default ApiError;
