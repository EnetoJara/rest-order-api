import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";

import app from "../../src/index";

chai.use(chaiHttp);
const { expect } = chai;

describe("baseRoute", () => {
    it("it should response with HTTP 200 status", async function () {
        return await chai
            .request(app)
            .get("/index")
            .then(res => {
                expect(res.status).to.be.equal(200);

            })
    })

    it('should respond with success message', async function () {
        return await chai.request(app).get('/index').then(res => { expect(res.body.status).to.be.equal('success'); })
    })
})