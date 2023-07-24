const express = require('express');
let router = express.Router();
const User = require('../models/user');
const Note = require('../models/note');
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

router.put('/update/name_email', WithAuth, async(req,res)=>{
    const user = req.user;
    const {name, email} = req.body 
    try {
        if (!user) {
            res.status(500).json({error: "Erro: user doesn't exist!"});
        } else {
            await User.findByIdAndUpdate(user._id, 
                { $set: {name: name , email: email}},
                {upsert: true , 'new': true } 
                );
            res.status(200).json(await User.findById(user._id))
        }
    } catch (error) {
        res.status(500).json({error: error});
    }   
});

router.put('/update/password', WithAuth, async(req, res)=>{
    const user = await User.findOne(req.user._id);
    const {oldPassword, newPassword} = req.body     
    try {
        if (!user) {
            res.status(500).json({error: "Erro: user doesn't exist!"});
        } else {
            user.isCorrectPassword(oldPassword, async function(err, same){
                if (!same) {
                    res.status(401).json({error: 'Incorrect password'});
                } else {
                    bcrypt.hash(newPassword, 10 , async(err, hashedPassword) =>{
                        if (err) {
                            throw "Unexpected error"
                        } else {
                            await User.findByIdAndUpdate(user._id, 
                                { $set: {password: hashedPassword}},
                                {upsert: true , 'new': true } 
                                );
                            res.status(200).json({message: 'successfully updated password'});
                        }
                    })                     
                }
            })
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.delete('/delete', WithAuth, async function(req,res){
    const user = req.user;
    try {
        if (!user) {
            res.status(500).json({error: "Erro: user doesn't exist!"});        
        } else {    
            const notas = await Note.deleteMany({ author: user._id });
            await User.findByIdAndDelete(user._id);
            res.status(200).json({message: "account deleted successfully!" + notas.deletedCount + "notes deleted"});        
        } 
    } catch (error) {
        res.status(500).json({error: error}); 
    }       
})

module.exports = router;