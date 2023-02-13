const express = require("express");
const projectModel = require('../models/project.js')
const projectRouter = express.Router()
const session = require('express-session')
const nodemailer = require('nodemailer')
let authGuard = require('../customDependecies/authGuard')   /*Appelle le fichier authGuard*/
const upload = require('../customDependecies/multer')

const transporter = nodemailer.createTransport({         /*envoyer un message*/
   service : 'gmail',
   auth : {
      user: "fonsat.nodemailer@gmail.com",
      pass: "dlclhbrybfcawlgi",
   }
})         

projectRouter.get('/projects', async (req, res) => {           /*Afficher tous les projets*/
   try {
      let projects = await projectModel.find();
      res.render('project.twig', {
        projects: projects,
        error: req.session.error
      })
   } catch (err) {
      res.send(err);
   }
})

projectRouter.get('/', async (req, res) => {           /*Afficher tous les projets*/
   try {
      res.redirect('/projects')
   } catch (err) {
      res.send(err);
   }
})

projectRouter.get('/deleteProject/:id', async (req, res) => {           /*Supprimer un projet*/
   try {
      await projectModel.deleteOne({ _id: req.params.id });
      res.redirect('/projects')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

projectRouter.get('/addProject', authGuard, async (req, res) => {               /*Afficher le formulaire pour ajouter un projet*/
   try {
      res.render('addProjectForm.twig')
   } catch (err) {
      res.send(err);
   }
})

projectRouter.post('/addProject',  upload.single('image'),async (req, res) => {              /*Envoie le nouvel projet*/
   try {
      req.body.image = req.file.filename
      let project = new projectModel(req.body)
      project.save()
      res.redirect('/addProject')
   } catch (err) {
      res.send(err);
   }
})



projectRouter.get('/update/:id', async (req, res) =>{          /*Affiche le formulaire de modification de projet*/
   try {
      res.render('updateProject.twig', {
         projectid : req.params.id
      })
   } catch (err) {
      res.send(err)
   }
})

projectRouter.post('/update/:id', async (req, res) => {     /*Envoie les modifications*/
   try {
      await projectModel.updateOne({ _id: req.params.id }, req.body);
      res.redirect('/projects')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})


projectRouter.post('/sendMail', async (req, res) =>{
   try{
      let info = await transporter.sendMail({
         from: req.body.mail,
         to: "eymen.kardous@gmail.com",
         subject: req.body.name,
         text: req.body.message,
      })
      res.redirect('/projects')
   }catch (err){
      res.send(err)
   }
})

module.exports = projectRouter
