import { Hono } from "hono";
import { signIn, signUp } from "../controllers/user.controller";
const router=new Hono()


router.post('/signup',signUp)
router.post('/signin',signIn)
export default router