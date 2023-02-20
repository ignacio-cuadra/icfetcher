# [icfetcher](https://github.com/ignacio-cuadra/icfetcher) [![npm version](https://img.shields.io/npm/v/icfetcher.svg?style=flat)](https://www.npmjs.com/package/react)

icfetcher is a JavaScript library for creating fetchers using fetch method with a variety of settings.

## Usage

```javascript
const fetcher = ({ url, method, body }) => {
  return fetchFactory({
    baseUrl: "https://pokeapi.co/api/v2",
    isJson: true, // Content-Type and Accept header = application/json
    url,
    method, // GET (default)
    body,
    autoBodyStringfy: true, // parse array to json string
    autoClearUndefinedBodyAttributes: true // remove nulls attributes
})

// without fetch wrapper
fetcher({url: '/pokemon/magikarp'})
  .then(response => response.json())  
  .then((response) => {
      console.log(response.forms[0].name)
    })
    .catch(error => console.log(error))

// with fetch wrapper
fetchWrapper(fetcher({url: '/pokemon/magikarp'}))
  .then(({status, data}) => {
    console.log(status ,data.forms[0].name)
  })
  .catch(error => console.log(error))
// catch and throw errors and transform result to json
```

## Fetch Factory Attributes

only url attribute is required

| attribute                        | description                                                                                 | example                             |
| -------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------- |
| baseUrl                          | base url value                                                                              | `https://pokeapi.co/api/v2`         |
| url                              | url after baseUrl value (if baseUrl does not exists this attribute is full url)             | `/pokemon/magikarp`                 |
| params                           | query strings                                                                               | `{q: 'test', type: 'issues'}`       |
| method                           | http verb                                                                                   | `GET`, `POST, `PUT`, `DELETE`, etc. |
| headers                          | custom headers                                                                              |                                     |
| body                             | body (http verb != `GET`)                                                                   |                                     |
| isJson                           | request and response are json (add Content-Type and Accept header `application/json` value) | `true` or `false`                   |
| autoBodyStringfy                 | parse json body yo string body                                                              | `true` or `false`                   |
| autoClearUndefinedBodyAttributes | remove undefined values in body object                                                      | `true` or `false`                   |
| mode                             | fetch mode                                                                                  |                                     |