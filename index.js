const express = require('express')
const { ROUTES } = require("./routes")
const {setupProxies} = require("./proxy")

const app = express()

setupProxies(app, ROUTES)

app.listen(8000,()=>{console.log('Listening on Port 8000')})