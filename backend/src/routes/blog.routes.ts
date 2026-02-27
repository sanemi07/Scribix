import { Hono } from "hono";
import { CreateBlog ,updateBlog,getBlog} from "../controllers/blog.controller";
const router=new Hono()


router.post('/blog',CreateBlog)
router.put('/blog',updateBlog)
router.get('/blog/:id',getBlog)
export default router