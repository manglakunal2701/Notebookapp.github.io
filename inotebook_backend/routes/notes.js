const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.post('/addnote', fetchuser, [
     body('title', 'Enter a valid title').isLength({ min: 3 }),
     body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
         try {
             const { title, description, tag } = req.body;
 
             // If there are errors, return Bad request and the errors
             const errors = validationResult(req);
             if (!errors.isEmpty()) {
                 return res.status(400).send("Validation error");
             }
             const note = new Note({
                 title, description, tag, user: req.user.id
             })
             const savedNote = await note.save()
 
             res.json(savedNote)
 
         } catch (error) {
             console.error(error.message);
             res.status(500).send("Internal Server Error");
         }
 })



 
router.put('/updatenote/:id', fetchuser,async (req,res)=>{
    try{
        const { title, description, tag } = req.body;
        //create a new note object
        const newNote ={};
        if(title){newNote.title= title};
        if(title){newNote.description= description};
        if(title){newNote.tag= tag};
         
        //find note to update  and update it
        let note = await Note.findById(req.params.id); //y id wo id hai jo req se aaa rhih h
        if(!note){return res.status(404).send("not found")} //agr bande ka note nhi h
        if(note.user.toString()!== req.user.id){
            return res.status(404).send("not Allowed")
        }
         note= await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
        res.json({note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deletenote/:id', fetchuser,async (req,res)=>{
    try{
         //find note to update  and delete it
         let note = await Note.findById(req.params.id); //y id wo id hai jo req se aaa rhih h
         if(!note){return res.status(404).send("not found")} //agr bande ka note nhi h

         //allow delete if user owns it
         if(note.user.toString()!== req.user.id){
            return res.status(404).send("not Allowed")
        }
        note= await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note is been deleted",note:note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports= router