import { Context, Hono } from "hono";
import { CreateBlog, getBlogbyId, getBlogs, UpdateBlog } from "../controllers/blog.controller";
import { verify } from "hono/jwt";
const router=new Hono()

router.use('/*',async(c:Context,next)=>{
    try {
        const authHeader= c.req.header('Authorization')||""
        const token=authHeader.split(' ')[1]
        
        console.log(authHeader)
        const res=await verify(token,c.env.JWT_SECRET,'HS256')
        if(!res){
             return c.json({msg:"issue while token vverification"},500)
        }
       
            c.set("userid",res.id)
             await  next()

        


       
       
    } catch (error) {
        console.log(error)
        return c.json({error:error,msg:"issue while token verification"},500)
    }
})
router.post('/blog',CreateBlog)
router.put('/blog',UpdateBlog)
router.get('/blog/:id',getBlogbyId)
router.get('/blog/bulk',getBlogs)
export default router