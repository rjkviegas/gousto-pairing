const app = require('../app');
const request = require('supertest');
const boxesJson = require('../json/boxes.json');
const ordersJson = require('../json/orders.json');
const intelligentPacking = require('../lib/intelligentPacking');

describe("Intelligent Packing app", () => {
    let server;
    beforeAll(() => {
        server = app.listen(3001);
    });

    afterAll(done => {
        server.close(done);
    });

    describe("/intelligentpacking route test", () => {
        it("returns intelligent packing information", async () => {
            const response = await request(server)
                .post('/intelligentpacking')
                .send({ boxes: boxesJson, orders: ordersJson })
                .set('Accept', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(intelligentPacking(boxesJson, ordersJson));
        });
    });
});
