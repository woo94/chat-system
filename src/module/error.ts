export class ChatSystemError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }

  get body() {
    return {
      code: this.code,
      message: this.message,
    };
  }

  public static badParamErr = (message?: string) => {
    return new ChatSystemError(400, "bad-param", message);
  };

  public static internalErr = (message?: string) => {
    return new ChatSystemError(500, "internal-error", message);
  };
}
