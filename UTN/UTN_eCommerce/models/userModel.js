const mongoose = require('../bin/mongodb');
const bcrypt = require("bcrypt");

const usersSchema =  new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true},
    password: {
        type: String,
        required: true}

});

usersSchema.pre("save", function(next) {
    this.password = bcrypt.hashSync(this.password,10);
    next();
});
// Validations
usersSchema.path("email").validate(function(value){
    const emailValidate = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(value);
    if (!emailValidate) return false;
},"El email solo puede contener letras, guiones bajo y guiones medios. Debe utilizar un @ para indicar su dominio");

usersSchema.path("password").validate(function(value){
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}/;
    return regex.test(value);
},"El password debe contener al menos 1 número, 1 minúscula , 1 mayúscula. Debe tener 6 caracteres como mínimo y 14 como máximo")

module.exports = mongoose.model('users', usersSchema);