import z from 'zod'


 export const signUpSchema=z.object({
    email:z.email(),
    name:z.string(),
    password:z.string(),
  


})
export const signInSchema=z.object({
    email:z.email(),
       password:z.string(),
    


})
export const CreatePostSchema=z.object({
    title:z.string(),
    content:z.string()
    


})
export const UpdatePostSchema=z.object({
    title:z.string(),
    content:z.string(),
    authorId:z.string()
    


})

export type SignUp=z.infer<typeof signUpSchema>
export type SignIn=z.infer<typeof signInSchema>
export type CreatePost=z.infer<typeof CreatePostSchema>
export type UpdatePost=z.infer<typeof UpdatePostSchema>