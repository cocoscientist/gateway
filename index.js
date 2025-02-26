const express = require('express')
const { ROUTES } = require('./routes')
const {setupProxies, setupProxy} = require('./proxy')
const { createClient } = require('redis')
const { gameRoute, gameCacheMiddleware } = require('./routes/gameRoute')

const client = createClient()
client.on('error',()=>{console.log('Error Occured')})
client.connect()

const app = express()

app.use('/games',gameCacheMiddleware(client))
setupProxy(app,gameRoute(client))

app.listen(8000,()=>{console.log('Listening on Port 8000')})