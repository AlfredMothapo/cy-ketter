var async = require("async");
var express = require("express");
var app = express();
var cors = require('cors')
// var timeout = require('connect-timeout');
const exec = require('child_process').exec;
const fs = require("fs")
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

app.use(fileUpload());
app.use(cors());
// app.use(timeout(1200000));

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/runIntegration", (req, res) => {

    async.series([

        function () {
            
            exec('npm run record', (error) => {
                if (error) {
                    res.send({ "message": "Error! one of the tests failed or something went wrong,  visit https://dashboard.cypress.io/#/projects/67txw5/runs for more detailed report " })
                }
                res.send({ "message": "Tests ran successfully , visit https://dashboard.cypress.io/#/projects/67txw5/runs for more detailed report" })
            });
        }
    ]);
})
app.post("/uploadTest", (req, res) => {

    if (!req.files || req.files.length < 0) { return res.status(400).send('No files were uploaded.'); }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uploadFile = req.files.uploadFile;
    // Use the mv() method to place the file somewhere on your server
    uploadFile.mv("cypress/integration/" + uploadFile.name, function (err) {
        if (err) { return res.send({ "message": "There was an error uploading your file." }); }
        res.send({ "message": "Uploaded successfully" })
    });
})

app.listen("8000", () => {
    console.log("Server started at localhost:8000")
});

