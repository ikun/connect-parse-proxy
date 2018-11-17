/*
 * 反向代理解析
 *
 */

var get = require('get');

function getRule(dictionary, pathName) {
    var result = dictionary.filter(function(item) {
        switch (Object.prototype.toString.call(item.location)) {
            case '[object String]':
                return item.location == pathName;
                break;
            case '[object RegExp]':
                return item.location.test(pathName);
                break;
            default:
                return false;
        }
    });
    return result.length ? result[0] : null;
}

function getUrlPass(req, pass) {
    return typeof pass == 'function' ? pass(req) : pass;
}
module.exports = function proxyMiddleware(dictionary) {
    return function(req, res, next) {
        var rule = getRule(dictionary, req._parsedUrl.pathname);
        var urlPass;
        var getParams;

        if (rule) {
            urlPass = getUrlPass(req, rule.pass);
            getParams = req._parsedUrl.query;
            if (urlPass.indexOf('http') === 0) {
                get(urlPass + '?' + getParams).asBuffer(function(error, data) {
                    var status = error ? 500 : 200;
                    var content = error ? JSON.stringify(error) : data.toString();
                    var contentType = rule.type || 'text/html; charset=utf-8';
                    res.writeHead(status, { 'Content-Type': contentType });
                    res.write(content);
                    res.end();
                });
            } else {
                req._parsedUrl.pathname = urlPass;
                next();
            }
        } else {
            next();
        }
    };
};
