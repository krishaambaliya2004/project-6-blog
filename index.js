const express = require('express')

const port = 9000

const app = express();

const path = require('path')

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(express.urlencoded());

app.use('/',require('./routes'))

const db = require('./config/mongoose')

const crudtbl = require('./models/blogTbl');

app.set('view engine','ejs');

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log("server start on port "+port);
})