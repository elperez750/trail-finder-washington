const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;



authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try{
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({msg: 'User created successfully'});



    }
    catch(err){
        if (err instanceof Error) {
            console.error('Database Connection Error:', err.message);
          } else {
            console.error('Unexpected Error:', err);
          }
          process.exit(1); // Exit process if unable to connect
    }

})


authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try{ 
        const user = await User.findOne({email});
        if (!user) {
           return res.status(400).json({msg: 'User does not exist'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }
        const token = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: '1h'});
        return res.status(200).json({token, user: {id: user._id, name: user.name, email: user.email}})
    }

    
catch(error) {
    console.error('Error:', error);
    res.status(500).json(({ error: 'Internal server error'}))
}

})


module.exports = authRouter;