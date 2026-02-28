import z from 'zod';
export declare const signUpSchema: z.ZodObject<{
    email: z.ZodEmail;
    name: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const signInSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const CreatePostSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.z.core.$strip>;
export declare const UpdatePostSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    authorId: z.ZodString;
}, z.z.core.$strip>;
export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;
export type CreatePost = z.infer<typeof CreatePostSchema>;
export type UpdatePost = z.infer<typeof UpdatePostSchema>;
//# sourceMappingURL=index.d.ts.map