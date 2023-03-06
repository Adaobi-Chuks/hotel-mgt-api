import express from 'express';
import UserController from '../controllers/user.controller';
const {createUser, getUsers, getUserById, editUser, deleteUserById, login} = new UserController();
import {validateUserReq, validateUserOpt} from "../middlewares/userValidation.middleware";
import authenticate from "../middlewares/authentication.middleware";
const router = express.Router();

//create a user or signup
router.post("/signup", validateUserReq, createUser);

//get users
router.get("/", getUsers);

//get a user
router.get("/:id", getUserById);

//edit any user details
router.patch("/:id", validateUserOpt, editUser);

// delete user
router.delete("/:id", authenticate, deleteUserById);

//login user
router.post("/login", validateUserOpt, login);

//logout user
// router.get("/logout", logout);

export default router;