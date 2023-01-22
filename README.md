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