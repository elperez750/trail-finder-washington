const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');



const usersRouter = express.Router();

usersRouter.post('/register', async (req, res) => {
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



module.exports = usersRouter;