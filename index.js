const express = require('express')
const { ROUTES } = require('./routes')
const {setupProxies, setupProxy} = require('./proxy')
const { createClient } = require('redis')
const { route, cacheMiddleware } = require('./routes/gameRoute')

const client = createClient()
client.on('error',()=>{console.log('Error Occured')})
client.connect()

const app = express()

// app.use('/games',async (req,res,next)=>{
//     if(req.query.title=='portal'){
//         res.send('Intercepted and Returned')
//     }else{
//         next()
//     }
// })

app.use('/games',cacheMiddleware(client))
setupProxy(app,route(client))

//setupProxies(app, ROUTES)

app.listen(8000,()=>{console.log('Listening on Port 8000')})