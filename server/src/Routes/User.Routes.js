import express from "express";
import { allUsers, deleteUser, getSingleUser, loginUser, registerUser, updateUser } from "../Controllers/User.Controllers.js";
import verifyToken from "../Middleware/Auth.js";


const router = express.Router();

router.post("/signup",registerUser);
router.post("/login",loginUser);
router.get("/single-user/:userId",getSingleUser);
router.get("/all-users",verifyToken,allUsers);
router.put("/update-user/:userId",verifyToken,updateUser);
router.delete("/delete-user",deleteUser);
export default router;