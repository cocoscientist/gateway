const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send("Boilerplate")
})

app.listen(8000,()=>{console.log('Listening on Port 8000')})