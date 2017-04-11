var _ = require('underscore');
module.exports = function (proxies) {
    return {
        takeProxy: function () {
            var proxy = _.sample(proxies);
            proxy.busy = true;
            return proxy;
        },
        // Mark the given proxy as free
        freeProxy: function (address, callback) {
            for (var index in proxies) {
                if (proxies[index].address === address || proxies[index].ipv4 === address) {
                    delete proxies[index].busy;
                    break;
                }
            }
            if (callback) {
                // Whether we have a free proxy
                for (var index in proxies) {
                    if (!proxies[index].busy) {
                        callback(undefined, true);
                        return;
                    }
                }
                callback(undefined, false);
            }
        }
    };
};
