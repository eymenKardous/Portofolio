const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const expressValidator = require('express-validator');
const projectRouter = require('./routes/projectRouter.js');
const createUserRouter = require('./routes/createUserRouter.js');
const connectRouter = require('./routes/connectRouter.js');

const db = process.env.BDD_URL;
const app = express();

app.use(session({secret: "azerty",saveUninitialized: true,resave: true}));
app.use(express.static('./assets')); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(projectRouter);
app.use(createUserRouter);
app.use(connectRouter);

app.listen(3000,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Je suis connecté');
    }
});

mongoose.set('strictQuery', false);
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connecté a la bdd");
    }
});
