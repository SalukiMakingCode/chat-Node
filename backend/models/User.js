const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email : { type: String, required: true, unique:true },
    password: { type: String, required:true },
    pseudo: { type: String, required:false },
    firstname: { type: String, required:false },
    lastname: { type: String, required:false },
    urlProfilePicture: { type: String, required:false },
    gender: { type: String, required:false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);