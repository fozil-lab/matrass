const express = require('express');
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')
const modules = require('./modules')

const PORT = process.env.PORT || 4500

const app = express()

let corsSettings = cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,delete",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
})
app.use(corsSettings)

app.use(express.json());
app.use( express.static(path.join(__dirname, 'uploads', 'images')) )
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

app.use(modules)

app.get('/', (req,res) => res.send('you successfully connection server'))




app.listen(PORT,()=> console.log('Server is running http://localhost:' + PORT));