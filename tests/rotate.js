var changer = require('../main');
changer = new changer([{
    ipv4: ":)"
}, {
    address: ":("
}]);
module.exports.testRotate = function (test) {
    var firstProxy = changer.take();
    var secondProxy = changer.take();
    var thirdProxy = changer.take();
    test.ok(undefined != firstProxy);
    test.ok(undefined != secondProxy);
    test.ok(undefined == thirdProxy);
    test.done();
};
module.exports.testFree = function (test) {
    changer.clear();
    var firstProxy = changer.take();
    var secondProxy = changer.take();
    test.ok(undefined != firstProxy);
    test.ok(undefined != secondProxy);
    if (secondProxy.ipv4) {
        changer.free(secondProxy.ipv4);
    } else if (secondProxy.address) {
        changer.free(secondProxy.address);
    }
    var thirdProxy = changer.take();
    test.ok(undefined != thirdProxy);
    test.done();
};