module.exports = function (proxies) {
    // Add a "busy" flag to proxy definitions
    for (var i = 0; i < proxies.length; i++) {
        proxies[i].busy = false;
    }
    // Module's object
    return {
        takeProxy: function () {
            for (var i = 0; i < proxies.length; i++) {
                if (false === proxies[i].busy) {
                    proxies[i].busy = true;
                    return proxies[i].address;
                }
            }
        },
        freeProxy: function (address, callback) {
            // Mark the current proxy as free
            for (var i in proxies) {
                if (proxies[i].address === address) {
                    proxies[i].busy = false;
                    break;
                }
            }
            if (undefined != callback) {
                // Whether we have a free proxy
                var hasFree = false;
                for (var i in proxies) {
                    hasFree = !proxies[i].busy;
                }
                if (hasFree == true) {
                    callback();
                }
            }
        }
    };
};
