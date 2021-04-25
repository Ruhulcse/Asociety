const mongoose = require('mongoose');
const validator = require('validator');

const ProjectSchema = new mongoose.Schema({

    title:{
      type: String,
      required: true,
    },
    projecturl:{
        type: String,
        required: true
    },
    partnerproject:{
        type: Boolean,
        required: true,
    },
    imageurl:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    
})

const project = mongoose.model("Project",ProjectSchema);
module.exports = project;
//my code 