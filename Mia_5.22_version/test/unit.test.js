const expect = require('chai').expect;

const testVendorsLocation = [
    // 需要检测的vendor，具体修改
    { name: "vendor1", location: [1, 1] },
    { name: "vendor2", location: [2, 1] },
    { name: "vendor3", location: [3, 2] },
    { name: "vendor4", location: [3, 3] },
    { name: "vendor5", location: [1, 0] },
    { name: "vendor6", location: [2, 2] },
    { name: "vendor7", location: [3, 4] },
    { name: "vendor8", location: [5, 4] }
]

const testVendorsResult = [
// 应该得到的检测结果，最近的五个vendor
]

describe("unit tests", () => {
    it('should return nearest five vendors', function (done) {
        let curr = { "lat": 0, "lng": 0 }
        var vendors = []
        for (i = 0; i < testVendorsLocation.length; i++) {
            var distance = Math.sqrt(Math.hypot(
                curr.lat - testVendorsLocation[i].location[0],
                curr.lng - testVendorsLocation[i].location[1]
            ))
            if (Number.isFinite(distance)) {
                vendors.push({ name: testVendorsLocation[i].name, distance: distance })
            }
        }
        vendors = vendors.sort(({ distance: a }, { distance: b }) => a - b).slice(0, 5)
        expect(vendors).to.eql(testVendorsResult)
        done()
    })
})