export default class ResponseIsNotJsonException extends Error {
  constructor(response) {
    super("Response Is Not Json Exception");
    this.response = response;
  }
}
