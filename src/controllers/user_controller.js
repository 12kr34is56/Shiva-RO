const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const UserController = {

    //write the function for route
    createAccount: async function (req, res) {
        try {
            const userData = req.body;
            const newUser = new UserModel(userData);
            await newUser.save();
            return res.json({ success: true, message: "User created successfully", data: newUser });

        } catch (e) {
            return res.json({ success: false, message: e });
        }
    },

    signIn: async function (req, res) {
        try {
            //fetch the email and password from req
            const { email, password } = req.body;
            //find the user with given email
            const foundUser = await UserModel.findOne({ email: email });
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Hashed Password from DB:', foundUser.password);

            //if user not found
            if (!foundUser) {
                return res.json({ success: false, message: "User not found" });
            }
            //if password is incorrect
            const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
            if (!isPasswordCorrect) {
                return res.json({ success: false, message: "Password incorrect" });
            }
            //if everything is correct
            return res.json({ success: true, message: "User logged in", data: foundUser });
        } catch (e) {
            return res.json({ success: false, message: e });
        }
    },


}

module.exports = UserController;