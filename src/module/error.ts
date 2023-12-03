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
}
