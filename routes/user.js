
import express from "express";
import { 
  createUser, 
  deleteUser, 
  getAllUsers, 
  getSingleUser, 
  updateUser 
} from "../controllers/userController.js";
import { userPhotoMulter } from "../utils/multer.js";


// init router from exxpress
const router = express.Router(); 


// routing
router
.route("/")
.get( getAllUsers )
.post( userPhotoMulter , createUser); 

router
.route("/:id")
.delete(deleteUser)
.patch(updateUser)
.get(getSingleUser); 

// export default
export default router; 








