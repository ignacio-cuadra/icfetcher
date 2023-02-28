export default class HttpException extends Error {
  public response;
  constructor(response) {
    super("Http Exception");
    this.response = response;
  }
}
