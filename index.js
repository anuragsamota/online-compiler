const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const child_process = require("child_process");



// temp file store function
async function tempfile(filename,filedata){
    await fs.writeFile(filename, filedata, function(err) {
        if(err) {
            return err;
        }
    });
}


process.env.PORT = 4040;

app.get('/', function (req, res) {
    fs.readFile("./tempui/index.html",'utf-8',function (err, html){
        if(err){
            res.status(500).send("sorry out of order");
        }else{
            res.send(html)
        }
    })
})



//node js endpoint
app.post('/nodejs',bodyParser.json(),async (req,res)=>{
    await tempfile("./tempnode.js",req.body.code)
    await child_process.exec("node ./tempnode.js",(error,stdout,stderr)=>{
        res.json({
            res : stdout,
            err : stderr,
            servererr: error,
        })
    })
    //res.end();
})


//python endpoint
app.post('/python',bodyParser.json(),async (req,res)=>{
    await tempfile("./temppython.py",req.body.code)
    await child_process.exec("python temppython.py",(error,stdout,stderr)=>{
        res.json({
            res : stdout,
            err : stderr,
            servererr: error,
        })
    })
    //res.end();
})


app.use(express.static(path.join('tempui')))
app.use(cors())
app.listen(process.env.PORT,()=>{ console.log(`app is listening on port ${process.env.PORT}`)});