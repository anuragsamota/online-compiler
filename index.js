const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

process.env.PORT = 4040;

app.get('/', function (req, res) {
    fs.readFile("./ui/index.html",'utf-8',function (err, html){
        if(err){
            res.status(500).send("sorry out of order");
        }else{
            res.send(html)
        }
    })
})

app.use(express.static(path.join('web')))


app.listen(process.env.PORT,()=>{ console.log(`app is listening on port ${process.env.PORT}`)});