const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bycrpt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchUser');
const JWT_SECRET = 'Kunalisagoodboy';
//route 1 to create user
router.post('/createuser',
  [ //this is validation of name emamil etc
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'Enter the valid password').isLength({ min: 8 }),
    body('name', 'Enter the valid name').isLength({ min: 5 }),
  ],
  async (req, res) => {
       let success=false;
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }
        //check wheather user with this email exists already;
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'a user with this email exists' });
            }
            const salt = await bycrpt.genSalt(10); //create salt of 10 size
            const secPass= await bycrpt.hash(req.body.password,salt);  // create hash of salt+password;
            //these lines are to create database with privded info
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });
            const data= {
                user:{
                   id:user.id
                }
            }
            const authToken=  jwt.sign(data,JWT_SECRET); //create token of the data 

            success=true;
            res.json({success,authToken})
            // res.json(user);
        } 
        //if any type exept upper error oocur than catch execute
        catch (error) {
            console.error(error.message);
            res.status(500).send('some internal error occured');
        }
   }
);
//route 2: for login 


router.post('/login',
  [ //this is validation of name emamil etc
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'Enter the valid password').isLength({ min: 8 }),
  ], 
  async (req, res) => {
        let success=false;
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //check wheather user with this email exists already;
        const {email,password}=req.body;   //login emails , passwords
        try {
            let user = await User.findOne({ email});
            if (!user) {
                success=false;
                return res.status(400).json({ error: 'Login again with correct credentials' });
            }
            const passwordCompare =await bycrpt.compare(password,user.password);
            if (!passwordCompare) {
                success=false;
                return res.status(400).json({ error: 'Login again with correct credentials' });
            }
        
            const data= {
                user:{
                   id:user.id, 
                }
            }
            const authToken=  jwt.sign(data,JWT_SECRET); //create token of the data 
             success=true;
            res.json({success,authToken})
            // res.json(user);
        } 
        //if any type exept upper error oocur than catch execute
        catch (error) {
            console.error(error.message);
            res.status(500).send('some internal error occured');
        }
   }
);

// route 3 to get  the user details of user;

router.post('/getuser',fetchuser,async (req,res)=>{
   
    try{
        const userId= req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('some internal error occured');
    }
} )
module.exports = router;
 