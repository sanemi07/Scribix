import { Hono } from "hono";
import { signInUser, signUpUser } from "../controllers/user.controller";
const router=new Hono()


router.post("/signUp",signUpUser)
router.post('/signIn',signInUser)

export default router