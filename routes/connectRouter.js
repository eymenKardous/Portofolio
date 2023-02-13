const express = require("express");
const connectModel = require("../models/connect.js");
const connectRouter = express.Router()
const session = require('express-session')
const { body, validationResult } = require('express-validator')
let crypto = require('../customDependecies/crypto')

connectRouter.get('/connect', async (req, res) => {               /*Afficher le formulaire pour ajouter un utilisateur*/
   try {
      res.render('connectForm.twig')
   } catch (err) {
      res.send(err);
   }
})

connectRouter.post('/connected', async (req, res) => {               /*Afficher le formulaire pour ajouter un utilisateur*/
   try {
      let user = await connectModel.findOne({ login: req.body.login })
      if (user) {
         if (await crypto.comparePassword(req.body.password,user.password)) {
            req.session.userId = user._id
            res.redirect("/addProject")
         } else {
            throw "mot de pass incorrect";
         }
      } else {
         throw "identifiant inconnu";

      }
   } catch (err) {
      console.log(err);
      req.session.error = err
      res.redirect("/projects")
   }
})

module.exports = connectRouter

