const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const WithAuth = require('../middlewares/auth');


router.post('/', WithAuth, async(req, res)=>{
    const {title, body} = req.body;
    

    try {
        const note = new Note({title: title, body: body, author: req.user._id}) 
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({error : `Problem to create a new note ${error}`});
    }
})

router.get('/:id', WithAuth, async(req,res)=>{
    const{id} = req.params;
    
    try {
        const note = await Note.findById(id);
        if(isOwner(req.user, note)){
            res.status(200).json(note);
        }else{
            res.status(403).json({error : `Permission denied!`});
        }
    } catch (error) {
        res.status(500).json({error : `Problem to get a note ${error}`});
    }
})

router.get('/', WithAuth, async(req, res)=>{
    try {
        const notes = await Note.find({author: req.user._id});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({error : `Problem to get a notes ${error}`});
    }
})

const isOwner = (user, note)=>{   
    if (JSON.stringify(user._id) === JSON.stringify(note.author)){
        return true;
    }else{
        return false;
    }
}


module.exports = router;