# 适用于 grunt-contrib-connect 插件，用于处理反向代理

## Example

```javascript
grunt.initConfig({
    connect: {
        server: {
            options: {
                middleware: function(connect, options, middlewares) {
                    middlewares.unshift(connectProxy([
                        // from /a/b to http://example.com/c/d
                        {
                            location: '/a/b',
                            pass: 'http://example.com/c/d',
                            type: 'text/html; charset=utf-8'
                        },
                        // from /a.1234.js to /a.js
                        {
                            location: /\.\d+\.(js|css)$/,
                            pass: function(req) {
                                var pathName = req._parsedUrl.pathname;
                                return pathName.replace(this.location, '.$1');
                            }
                        }
                    ]));
                    return middlewares;
                }
            }
        }
    }
});
```

## 参数说明

- location String|RegExp 匹配要访问的url
- pass String|Function 实际访问的url，可以为本地的另一个地址
- type String 如果pass地址为其他域名的url，则会根据type设置返回头的 Content-Type, 默认值为'text/html; charset=utf-8'