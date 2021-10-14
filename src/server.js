const express = require('express');
const fileUpload = require('express-fileupload')
const path = require('path')
const modules = require('./modules')

const PORT = process.env.PORT || 4500

const app = express()

app.use(express.json());
app.use( express.static(process.env.PWD + path.join(__dirname, 'uploads', 'images')) )
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

app.use(modules)

app.get('/', (req,res) => res.send('you successfully connection server'))




app.listen(PORT,()=> console.log('Server is running http://localhost:' + PORT));