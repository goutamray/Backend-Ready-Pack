

import mongoose from "mongoose";

// create user schema
const userSchema = mongoose.Schema({
  name : {
    type: String,
    trim : true,
  }, 
  email : {
    type : String,
    trim : true, 
    unique : true,
  },
  password : {
    type : String,
    trim : true, 
  },
  phone : {
    type : String,
    trim : true,
  },
  photo : {
    type : String,
    trim : true,
    default : null,
  },
  accessToken : {
    type : String,
    default : null,
  },
  isVerified : {
     type : Boolean,
     default : false,
  },
  isActivated : {
    type : Boolean,
    default : false,
  },
  gender : {
    type : String,
    default : null,
    enum : ["Male", "Female", "Custom"]
  },
  status : {
    type : Boolean,
    default : true,
 },
 trash : {
   type : Boolean,
   default : false,
 }


}, 
{
  timestamps : true,
}
); 



// export default schema
export default mongoose.model("User", userSchema)











