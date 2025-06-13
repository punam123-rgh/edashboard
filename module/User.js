const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String

});
module.exports= mongoose.model("users",userSchema);
//In Mongoose, a model is a wrapper for a Mongoose schema that provides an interface to interact with a specific MongoDB collection.