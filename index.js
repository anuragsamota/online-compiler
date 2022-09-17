const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const child_process = require("child_process");



// temp file store function
async function tempfile(filedata){
    await fs.writeFile("temp.js", filedata, function(err) {
        if(err) {
            console.log(err);
            return err;
        }
        console.log("The file was saved!");
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


//executing command on post request on c route
app.post('/nodejs',bodyParser.json(),async (req,res)=>{
    let std_out,std_err
    await tempfile(req.body.code)
    await child_process.exec("node ./temp.js",(error,stdout,stderr)=>{
        console.log("Executing the command...")
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            std_err = stderr;
            return;
        }
        console.log(`stdout: ${stdout}`);
        std_out = stdout;
    })
    res.json({
        res : std_out,
        err : std_err,
    })
    res.end();
})


app.post('/test',bodyParser.json(),(req,res)=>{
    console.log(req.body)
    res.end()
});


app.use(express.static(path.join('tempui')))
app.use(cors())
app.listen(process.env.PORT,()=>{ console.log(`app is listening on port ${process.env.PORT}`)});