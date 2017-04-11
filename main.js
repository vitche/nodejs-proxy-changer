var _ = require('underscore');
module.exports = function (proxies) {
    return {
        clear: function () {
            for (var index in proxies) {
                delete proxies[index].busy;
            }
        },
        take: function () {
            var freeProxies = _.filter(proxies, function (proxy) {
                return !proxy.busy;
            });
            var proxy = _.sample(freeProxies);
            if (proxy) {
                proxy.busy = true;
            }
            return proxy;
        },
        // Mark the given proxy as free
        free: function (address, callback) {
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
