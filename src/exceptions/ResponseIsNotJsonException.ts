export default class ResponseIsNotJsonException extends Error {
  public response;
  constructor(response) {
    super("Response Is Not Json Exception");
    this.response = response;
  }
}
