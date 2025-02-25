const express = require('express')
const { ROUTES } = require("./routes")
const {setupProxies} = require("./proxy")

const app = express()

app.use('/games',async (req,res,next)=>{
    if(req.query.title=='portal'){
        res.send('Intercepted and Returned')
    }else{
        next()
    }
})

setupProxies(app, ROUTES)

app.listen(8000,()=>{console.log('Listening on Port 8000')})