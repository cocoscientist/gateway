const { responseInterceptor } = require('http-proxy-middleware')

const gameRoute = (client)=>{ return {
    url: '/games',
    proxy: {
        target: "https://www.cheapshark.com/api/1.0/",
        changeOrigin: true,
        selfHandleResponse: true,
        on:{
            proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
                const response = responseBuffer.toString('utf8');
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

exports.gameRoute = gameRoute
exports.gameCacheMiddleware = cacheChecker