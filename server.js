const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
var history = require('connect-history-api-fallback');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const app = express();

app.use(history());
app.use(serveStatic(path.join(__dirname, 'dist')));


app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());


app.post('/upload',cors(), (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });

})


const port = process.env.PORT || 3000;



app.listen(port);