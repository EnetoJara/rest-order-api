import chai from "chai"
import chaiHttp = require("chai-http")
import "mocha"
import app from "../../src/index"
import { OrderModel } from "../../src/schemas/order.schema"
import { OrderStatus } from "../../src/types/models"

chai.use(chaiHttp)

const { expect } = chai

const order = new OrderModel({
    // generic random value from 1 to 100 only for tests so far
    userId: 20,
    quantity: 1,
    shipDate: new Date(),
    status: OrderStatus.Placed,
    complete: false,
})

describe("userRoute", () => {
    it("should respond with HTTP 404 status because there is no order", async () => {
        return chai
            .request(app)
            .get(`/store/orders/${order._id}`)
            .then(res => {
                expect(res.status).to.be.equal(404)
            })
    })
    it("should create a new order and retrieve it back", async () => {
        return chai
            .request(app)
            .post("/store/orders")
            .send(order)
            .then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body.userId).to.be.equal(order.userId)
                expect(res.body.complete).to.be.equal(false)
                order._id = res.body._id
            })
    })
    it("should return the order created on the step before", async () => {
        return chai
            .request(app)
            .get(`/store/orders/${order._id}`)
            .then(res => {
                expect(res.status).to.be.equal(200)
                expect(res.body._id).to.be.equal(order._id)
                expect(res.body.status).to.be.equal(order.status)
            })
    })
    it("should return the inventory for all users", async () => {
        return chai
            .request(app)
            .get("/store/inventory")
            .then(res => {
                expect(res.status).to.be.equal(200)
                expect(res.body[20].length).to.be.equal(1)
            })
    })
    it("should remove an existing order", async () => {
        return chai
            .request(app)
            .del(`/store/orders/${order._id}`)
            .then(res => {
                expect(res.status).to.be.equal(204)
            })
    })
    it("should return 404 when it is trying to remove an order because the order does not exist", async () => {
        return chai
            .request(app)
            .del(`/store/orders/${order._id}`)
            .then(res => {
                expect(res.status).to.be.equal(404)
            })
    })
})
