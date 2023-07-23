const express = require('express');
let router = express.Router();
const User = require('../models/user');
const Note = require('../models/note');
const  jwt = require('jsonwebtoken');
const WithAuth = require('../middlewares/auth');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;


router.post('/register', async(req, res)=>{
    const {name, email, password } = req.body;
    const user = new User ({name, email, password});  
    
    try{        
        await user.save();
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error: `Error registering new user! ${error}`});
    }
});

router.post('/login', async function(req, res){
    const {email, password } = req.body;
    
    let user = await User.findOne({ email });     

    try{        
        if(!user){
            res.status(401).json({error: 'Incorrect email or password'});
        }
        else{
            user.isCorrectPassword(password, function(err, same){
                if(!same){
                    res.status(401).json({error: 'Incorrect email or password'});
                }
                else{
                    const token = jwt.sign({email}, secret, {expiresIn: '10d'});
                    res.json({user: user, token: token});
                }
            })
        }
    }catch(error){
        
    }
});

router.delete('/delete', WithAuth, async function(req,res){
    const user = req.user;
    if (!user) {
        res.status(500).json({error: "user doesn't exist!"});        
    } else {    
        const notas = await Note.deleteMany({ author: user._id });
        await User.findByIdAndDelete(user._id);
        res.status(200).json({message: "account deleted successfully!" + notas.deletedCount + "notes deleted"});        
    }    
})



module.exports = router;