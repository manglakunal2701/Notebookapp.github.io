//  const mongoose = require('mongoose');
var mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const mongoURI = "mongodb+srv://manglakunal2701:root@cluster0.tjnfgrc.mongodb.net/test"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully")
    })
}

module.exports= connectToMongo;