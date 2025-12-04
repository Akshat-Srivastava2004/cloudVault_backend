import { Router } from "express";
import { Userregister,loginUser } from "../controller/userprofile_controller.js";
const router=Router();



router.route("/registeruser").post(Userregister)
router.route("/loginuser").post(loginUser)

export default router