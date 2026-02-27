import { Context } from "hono";
import { getPrisma } from "../lib/db";
import { sign } from "hono/jwt";

export const signUp=async(c:Context)=>{
    try {
        const prisma=getPrisma(c.env.DATABASE_URL)
        const body=await c.req.json()
        const userexist=await prisma.user.findFirst({where:{
            email:body.email
        }})
        if(userexist){
             return c.json({msg:"email exist"},500)
        }
        const user=await prisma.user.create({
            data:{
                email:body.email,
                name:body.name,
                password:body.password
            }
        })
        const token=await sign({id:user.id},c.env.JWT_SECRET)
        return c.json({token})

    } catch (error) {
        return c.json(error,500)
    }

}