import { Hono } from "hono";
import { signUp } from "../controllers/user.controller";
const router=new Hono()


router.post('/signup',signUp)
export default router