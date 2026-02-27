import { Context } from "hono";
import { getPrisma } from "../lib/db";

export const CreateBlog=async(c:Context)=>{
    try {
        const prisma=getPrisma(c.env.DATABASE_URL)
        const body=await c.req.json()
        const blog=await prisma.post.create({data:{
            title:body.title,
            content:body.content,
           
            authorId:c.get("userid")

        }})
        return c.json(blog)
    } catch (error) {
        console.log(error)
          return c.json({error:error,msg:"issue while creatingblog "},500)
    }

}
export const getBlogbyId=async(c:Context)=>{
    try {
         const prisma=getPrisma(c.env.DATABASE_URL)
        const body=await c.req.json()
        const blog=await prisma.post.findFirst({where:{
            id:body.id
        }})
        return c.json(blog)
        
       
       
    } catch (error) {
          return c.json({error:error,msg:"issue while getting blog "},500)
    }
    
}
export const UpdateBlog=async(c:Context)=>{
    try {
        const prisma=getPrisma(c.env.DATABASE_URL)
        const body=await c.req.json()
        const blog=await prisma.post.update({where:{
            id:body.id
        },data:{
            title:body.title,
            content:body.content,
            

        }})
        return c.json(blog)
    } catch (error) {
          return c.json({error:error,msg:"issue while updatingblog "},500)
    }
}
export const getBlogs=async(c:Context)=>{
     try {
        const prisma=getPrisma(c.env.DATABASE_URL)
       
        const blog=await prisma.post.findMany()
        return c.json(blog)
    } catch (error) {
          return c.json({error:error,msg:"issue while gettiongblog "},500)
    }
}