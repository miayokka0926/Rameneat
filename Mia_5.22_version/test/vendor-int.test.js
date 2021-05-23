// Vendor integration test
const expect = require('chai').except;
const request = require('request');
const app = require('../server');

const baseUrl = "http://localhost:3000/vendor"

const testVendorPark = {
    validBody: {
        "parked": true,
        "location": [], // 坐标位置
        "textAddress": "" // 具体位置
    }
}

const testVendorId = "" // 好像是任意一个vendorid都可以

describe("vendor integration test", () => {
    
    it('should successfully set status of van of parking', function (done) {
        request.post(
            {
                headers: { 'content-type': 'application/json' },
                url: baseUrl + '/park' + testVendorId,
                body: testVendorPark.validBody,
                json: true,
            },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.updateVendor.parked).to.equal(true);
                if (error) done(error);
                else done();
            }
        );
    })

})