import BadRequestException from "./exceptions/BadRequestException.js";
import ClientException from "./exceptions/ClientException.js";
import ForbbidenException from "./exceptions/ForbbidenException.js";
import NotFoundException from "./exceptions/NotFoundException.js";
import ResponseIsNotJsonException from "./exceptions/ResponseIsNotJsonException.js";
import ServerException from "./exceptions/ServerException.js";
import UnauthorizedException from "./exceptions/UnauthorizedException.js";
import UnprocessableEntityException from "./exceptions/UnprocessableEntityException.js";

export default function fetchWrapper(service) {
  return service
    .then((response) =>
      response.text().then((text) => ({ text, status: response.status }))
    )
    .then(({ text, status }) => ({
      text,
      status,
      isSuccess: () => status >= 200 && status < 300,
      isClientException: () => status >= 400 && status < 500,
      isNotFound: () => status === 404,
      isServerException: () => status >= 500 && status < 600,
      isBadRequest: () => status === 400,
      isUnprocessableEntity: () => status === 422,
      isUnauthorized: () => status === 401,
      isForbbiden: () => status === 403,
    }))
    .then((response) => {
      try {
        const data = JSON.parse(response.text);
        return { data, ...response };
      } catch (e) {
        throw new ResponseIsNotJsonException({ data: null, ...response });
      }
    })
    .then((response) => {
      if (response.isForbbiden()) throw new ForbbidenException(response);
      if (response.isUnauthorized()) throw new UnauthorizedException(response);
      if (response.isServerException()) throw new ServerException(response);
      if (response.isBadRequest()) throw new BadRequestException(response);
      if (response.isUnprocessableEntity())
        throw new UnprocessableEntityException(response);
      if (response.isNotFound()) throw new NotFoundException(response);
      if (response.isClientException()) throw new ClientException(response);
      return response;
    });
}
