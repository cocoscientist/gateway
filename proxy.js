const { createProxyMiddleware } = require('http-proxy-middleware')

const setupProxies = (app, routes) => {
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy))
    })
}

const setupProxy = (app,route) => {
    app.use(route.url,createProxyMiddleware(route.proxy))
}

exports.setupProxies = setupProxies
exports.setupProxy = setupProxy