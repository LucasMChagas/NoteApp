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


module.exports = router;