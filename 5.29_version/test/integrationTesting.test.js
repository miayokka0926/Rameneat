const expect = require('chai').expect;
const request = require('request');
const app = require('../src/app');


const baseUrl = "http://localhost:3000/"

const testCustomerProfile = {
    validBody: {
        "name": 'Mia',
        "familyName": 'Ma',
        "password": '123'
    }
}

const testCustomerID = "60ac96957ffd0522552abe83"

describe("customer profile integration test", () => {
    it ('should successfully reset the customer profile', function (done) {
        request.post(
            {
                headers: {'conntent-type' : 'application/json'},
                url: baseUrl + testCustomerID,
                body: testCustomerProfile.validBody,
                json: true,
            },
            function (error, response, body) {
                expect(app.response.statusCode).to.equal(200);
                // expect(body.name).to.equal(Mia);
                // console.log(response.status);
                
                if (error) done(error);
                else done();
            }
        )
    })
    
})