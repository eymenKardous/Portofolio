const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    description: {
        type: String,
        required: [true, 'Pas de détails'],
    },
    techno: {
        type: String,
        required: [true, 'Pas de techno'],
    },
    image: {
        type: String,
        required: [true, 'Pas d image']
    },
    url: {
        type: String,
        required: [true, 'Pas d URL']
    }
})

const projectModel = mongoose.model('projects', projectSchema);

module.exports = projectModel
