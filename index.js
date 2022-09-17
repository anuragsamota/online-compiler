const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { exec } = require("child_process");



// temp file store function
async function tempfile(filedata){
    await fs.writeFile("temp.js", filedata, function(err) {
        if(err) {
            console.log(err);
            return err;
        }
        console.log("The file was saved!");
    });
    return;
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
    await tempfile(req.body.code)
    await exec("node ./temp.js",(error,stderr,stdout)=>{
        console.log("Executing the command...")
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.json({
                std_res : stderr,
            });
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.json({
            std_res : stdout,
            std_err : stderr,
        })
    })
})


app.use(express.static(path.join('tempui')))
app.use(cors())
app.listen(process.env.PORT,()=>{ console.log(`app is listening on port ${process.env.PORT}`)});