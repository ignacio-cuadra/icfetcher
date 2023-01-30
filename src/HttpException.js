export default class HttpException extends Error {
  constructor(response) {
    super("Http Exception");
    this.response = response;
  }
}
