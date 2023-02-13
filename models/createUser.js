const mongoose = require('mongoose')

const createUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    prenom: {
        type: String,
        required: [true, 'Pas de prénom'],
    },
    mail: {
        type: String,
        required: [true, 'Pas de mail'],
    },
    login: {
        type: String,
        required: [true, 'Pas de login']
    },
    password: {
        type: String,
        required: [true, 'Pas de password']
    }
})

const createUserModel = mongoose.model('createUsers', createUserSchema);

module.exports = createUserModel
