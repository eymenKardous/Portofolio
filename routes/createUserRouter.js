const express = require("express");
const createUserModel = require("../models/createUser.js");
const createUserRouter = express.Router()
const session = require('express-session')
let crypto = require('../customDependecies/crypto')




createUserRouter.get('/createUser', async (req, res) => {               /*Afficher le formulaire pour ajouter un utilisateur*/
try {
   res.render('createUserForm.twig')
} catch (err) {
   res.send(err);
}
})

createUserRouter.post('/createUser', async (req, res) => {              /*Envoie le nouvel utilisateur*/
try {
   req.body.password = await crypto.cryptPassword(req.body.password)
   let createUser = new createUserModel(req.body)
   createUser.save()
   res.redirect('/addProject')
} catch (err) {
   console.log(err);
   res.send(err);
}
})

module.exports = createUserRouter