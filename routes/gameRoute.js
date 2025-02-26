const { responseInterceptor } = require('http-proxy-middleware')

const route = (client)=>{return{
    url: '/games',
    proxy: {
        target: "https://www.cheapshark.com/api/1.0/",
        changeOrigin: true,
        selfHandleResponse: true,
        on:{
            proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                // log original request and proxied request info
                const exchange = `[DEBUG] ${req.method} ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
                console.log(exchange); // [DEBUG] GET / -> http://www.example.com [200]
                // log complete response
                const response = responseBuffer.toString('utf8');
                console.log(response); // log response body
                if(!!req.query.id){
                    await client.set(`__gameid__${req.query.id}`,response)
                    console.log('Saved')
                }
                return responseBuffer;
            })
        }
    }}
}

const cacheChecker = (client) => {
    return async (req,res,next) => {
        if(!!req.query && !!req.query.id){
            let key = `__gameid__${req.query.id}`
            let stored = await client.exists(key)
            if(stored){
                console.log('Cached')
                let body = await client.get(key)
                res.status(200).send(JSON.parse(body))
                res.end()
            }else{
                next()
            }
        }else{
            next()
        }
    }
}

exports.route = route
exports.cacheMiddleware = cacheChecker