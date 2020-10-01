
const usersModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
    register:  async (request, response, next) => {
        try{
            const newUser = new usersModel({
                                email: request.body.email,
                                password: request.body.password  
                            });
            const aux = await newUser.save();
            response.json(aux);
        } catch (e){
            next(e);
        }
    },
    login: async (request, response, next) => {
        try{
            const user = await usersModel.findOne({email: request.body.email});
            if(user){
                if(bcrypt.compareSync(request.body.password, user.password)) {
                    const token = jwt.sign({userId: user._id}, request.app.get("secretKey"));
                    response.json({token: token}); 
                }
                    else
                        response.json({error: "Contraseña erronea"}); 
                }
                else
                    response.json({error: "Email no encontrado"}); 
        } catch (e){
            next(e);
        }
    }
}  