const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    fullName : {
        type : String, 
        required : true
    }, 
    email : {
        type : String, 
        required : true, 
        unique : true
    }, 
    phone : {
        type : Number, 
        required : true, 
        unique : true
    }, 
    gender : {
        type : String, 
        required : true, 
    }, 
    pass : {
        type : String, 
        required : true, 
    }, 
    geoLocation : {
      latitude : Number, 
      longitude : Number
    }
  }); 


  module.exports = mongoose.model('User', userSchema); 