const express = require('express');
const fileUpload = require('express-fileupload')
const path = require('path')
const modules = require('./modules')

const app = express()

app.use(express.json());
app.use( express.static(path.join(__dirname, 'uploads', 'images')) )
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

app.use(modules)

app.get('/', (req,res) => res.send('you successfully connection server'))




app.listen(4500,()=> console.log('Server is running http://localhost:4500'));