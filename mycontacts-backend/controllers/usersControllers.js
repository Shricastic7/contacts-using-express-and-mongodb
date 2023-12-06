const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
//@desc Register user
//@route POST /api/users/register
//@access private
const registerUser = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mendatory!");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    const hashedPassword =  await bcrypt.hash(password, 10);
    console.log("hashed password",hashedPassword);

    const user = await User.create({
        username,
        email,
        password : hashedPassword
    });


    res.json(user);
});

//@desc Login User
//@route POST /api/users/login
//@access private
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({email}); 
    if(user && (await bcrypt.compare(password, user.password))){
        
        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email : user.email,
                id : user.id, 
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "1m"}
        )
        res.status(200).json({accessToken});
    } else{
        res.status(401);
        throw new Error("email or password is not valid!");
    }
});

//@desc Current User
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler( async (req, res) => {
    res.json(`Current user`)
})


module.exports = {registerUser, loginUser, currentUser};