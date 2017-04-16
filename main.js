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
        free: function (proxy, callback) {
            for (var index in proxies) {
                var current = proxies[index];
                if (proxy instanceof String) {
                    if (current.address === proxy) {
                        delete current.busy;
                        break;
                    }
                } else if (proxy instanceof Object) {
                    if (current.ipv4 === proxy.ipv4 &&
                        current.port === proxy.port &&
                        current.type === proxy.type) {
                        delete current.busy;
                        break;
                    }
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
