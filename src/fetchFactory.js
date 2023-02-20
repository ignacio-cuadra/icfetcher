import _ from "lodash";

export default function fetchFactory({
  baseUrl,
  url,
  params,
  method,
  headers,
  body,
  isJson,
  autoBodyStringfy = false,
  autoClearUndefinedBodyAttributes = false,
  bearerToken,
  mode,
} = {}) {
  if (!url) throw new Error("url is undefined");
  if (!params) params = {};
  if (!isObject(params)) throw new Error("params must be object");
  if (!baseUrl) baseUrl = "";
  if (!headers) headers = {};
  if (!method) method = "GET";
  if (bearerToken) {
    console.warn("bearedToken attribute is DEPRECATED");
    if (headers["Authorization"])
      console.warn(
        "bearerToken option redeclare Authorization header (with Bearer prefix)"
      );
    headers["Authorization"] = `Bearer ${bearerToken}`;
  }
  if (isJson) {
    if (headers["Content-Type"] || headers["Accept"])
      console.warn(
        'isJson option redeclare Content-Type and Accept headers with value "application/json"'
      );
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
  }
  if (autoClearUndefinedBodyAttributes && typeof body === "object")
    body = _.omitBy(body, _.isUndefined);
  if (autoBodyStringfy && typeof body === "object") body = JSON.stringify(body);

  const fullUrl = `${baseUrl}${url}?${new URLSearchParams(params)}`;
  return fetch(fullUrl, {
    method,
    headers,
    body,
    mode,
  });
}

const isObject = (value) => {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
};
