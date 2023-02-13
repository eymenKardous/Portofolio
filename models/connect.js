const mongoose = require('mongoose')

const connectSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, 'Pas de login']
    },
    password: {
        type: String,
        required: [true, 'Pas de pasword']
    }
})

const connectModel = mongoose.model('createusers', connectSchema);

module.exports = connectModel