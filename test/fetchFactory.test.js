import { expect } from "chai"
import { fetchFactory, fetchWrapper } from "../src/index.js"

describe("create fetcher and fetch a random pokemon", () => {
  const fetcher = ({ url, method, body }) => {
    return fetchFactory({
      baseUrl: "https://pokeapi.co/api/v2",
      isJson: true,
      url,
      method,
      body,
      autoBodyStringfy: true,
      autoClearUndefinedBodyAttributes: true
    })
  }
  it("use fetcher to fetch a magikarp (the best pokemon ever)", (done) => {
    fetcher({url: '/pokemon/magikarp'})
      .then(response => response.json())  
      .then((response) => {
          expect(response.forms[0].name).to.equal('magikarp')
          done()
        })
        .catch(done)
  })
  it("use fetch wrapper to convert response in json", (done) => {
    fetchWrapper(fetcher({url: '/pokemon/magikarp'}))
      .then(({status, data}) => {
        expect(status).to.equals(status)
        expect(data.forms[0].name).to.equals('magikarp')
        done()
      })
      .catch(done)
  })
})

//icfetcher