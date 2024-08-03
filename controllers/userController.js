
import asyncHandler from "express-async-handler"; 
import User from "../models/User.js"; 
import bcrypt from "bcrypt";
import { fileUploadToCloud } from "../utils/cloudinary.js";
import { isEmail, isMobile } from "../helpers/helpers.js";


/**
 * @DESC GET ALL USER 
 * @METHOD GET
 * @ROUTE /api/v1/user
 * @ACCESS PUBLIC 
 * 
 */
export const getAllUsers = asyncHandler(async(req, res) => {
   // get all users 
    const users = await User.find({ status : true}); 
      
   // check users data 
   if (users.length === 0) {
      return res.status(404).json({ users : "", message : "Users Not Found"});
   }; 

  res.status(200).json({ users, message : "All users data"});
});  


/**
 * @DESC GET SINGLE USER 
 * @METHOD GET
 * @ROUTE /api/v1/user/:id
 * @ACCESS PUBLIC 
 * 
 */
export const getSingleUser = asyncHandler(async(req, res) => {
    
});  

/**
 * @DESC CREATE NEW USER 
 * @METHOD POST
 * @ROUTE /api/v1/user
 * @ACCESS PUBLIC 
 * 
 */
export const createUser = asyncHandler(async(req, res) => {
  // get form data 
  const { name, email, phone, password } = req.body;

  // validation 
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ users : "", message : "All fileds are required"});
  };

  // hash password 
  const hassPass = await bcrypt.hash(password, 10); 

  // check valid email 
  if (!isEmail(email)) {
    return res.status(400).json({users : "", message : "Invalid Email Address"});
  };
 
  // check valid phone number 
  if (!isMobile(phone)) {
     return res.status(400).json({users : "", message : "Invalid Phone Number"});
  };

  // check email existance
   const emailCheck = await User.findOne({ email });

  if (emailCheck) {
     return res.status(400).json({ users : "", message : "Email Already Exisits"});
  };

  // phone number check 
   const phoneCheck = await User.findOne({ phone });

  if (phoneCheck) {
    return res.status(400).json({ users : "", message : "Phone Number Already Exisits"});
  };

   // photo manage 
   let filedata = null;

   if(req.file){
    const data = await fileUploadToCloud(req.file.path)
    filedata = data.secure_url;
   }; 

  // create user 
  const user = await User.create({ 
    name, 
    email, 
    phone, 
    password : hassPass, 
    photo : filedata, 
  });

  res.status(201).json({ user : user, message : "User Created Successfull", });
});  

/**
 * @DESC DELETE USER 
 * @METHOD DELETE
 * @ROUTE /api/v1/user/:id
 * @ACCESS PUBLIC 
 * 
 */
export const deleteUser = asyncHandler(async(req, res) => {
    
});  

/**
 * @DESC UPDATE USER 
 * @METHOD UPDATE
 * @ROUTE /api/v1/user/:id
 * @ACCESS PUBLIC 
 * 
 */
export const updateUser = asyncHandler(async(req, res) => {
    
});  








