import { Router } from "express";
import { 
  Userregister, 
  loginUser, 
  logoutUser 
} from "../controller/userprofile_controller.js";

const router = Router();
router.post("/register", Userregister);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
