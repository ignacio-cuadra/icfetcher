"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_js_1 = require("../src/index.js");
describe("create fetcher and fetch a random pokemon", () => {
    const fetcher = ({ url, method, body, }) => {
        return index_js_1.fetchFactory({
            baseUrl: "https://pokeapi.co/api/v2",
            isJson: true,
            url,
            method,
            body,
            autoBodyStringfy: true,
            autoClearUndefinedBodyAttributes: true,
        });
    };
    it("use fetcher to fetch a magikarp (the best pokemon ever)", (done) => {
        fetcher({ url: "/pokemon/magikarp" })
            .then((response) => response.json())
            .then((response) => {
            chai_1.expect(response.forms[0].name).to.equal("magikarp");
            done();
        })
            .catch(done);
    });
    it("use fetch wrapper to convert response in json", (done) => {
        index_js_1.fetchWrapper(fetcher({ url: "/pokemon/magikarp" }))
            .then(({ status, data }) => {
            chai_1.expect(status).to.equals(status);
            chai_1.expect(data.forms[0].name).to.equals("magikarp");
            done();
        })
            .catch(done);
    });
});
//icfetcher
//# sourceMappingURL=fetchFactory.test.js.map