import { Context } from "hono";
import { getPrisma } from "../lib/db";
import bcrypt from "bcryptjs";
import { jwt, sign } from "hono/jwt";


export const signUpUser=async(c:Context)=>{
     try {
        const prisma=getPrisma(c.env.DATABASE_URL)
        const body=await c.req.json()
        const userExist=await prisma.user.findFirst({
            where:{
                email:body.email
            }
        })
        if(userExist){
            return c.json({msg:"user email already exist"},500)
        }
        const hashedPassword=await bcrypt.hash(body.password,12)
        const user=await prisma.user.create({data:{
            email:body.email,
            name:body.name,
            password:hashedPassword
        }})
        const token=sign({id:user.id},c.env.JWT_SECRET)
        if(!token){
             return c.json({msg:"token not created"},500)
        }
        return c.json({jwt:token})



     } catch (error) {
          return c.json({msg:"user signup error",error},500)
     }
}
export const signInUser=async(c:Context)=>{
    try {
         const prisma=getPrisma(c.env.DATABASE_URL)
        const body=await c.req.json()
        const user=await prisma.user.findFirst({where:{
            email:body.email
        }})
        if(!user){
            return c.json({msg:"user email not  exist"},500)
        }
        const isPassword=await bcrypt.compare(body.password,user.password)
        if(!isPassword){
             return c.json({msg:"upasword wrong"},500)
        }
         const token=sign({id:user.id},c.env.JWT_SECRET)
        if(!token){
             return c.json({msg:"token not created"},500)
        }
          return c.json({jwt:token})

        

    } catch (error) {
        return c.json({msg:"user signin error",error},500)
    }
}