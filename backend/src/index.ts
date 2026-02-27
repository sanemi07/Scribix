import { Hono } from 'hono'
import userRouter from './routes/user.routes'



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()


app.get('/', (c) => {
  
  return c.text('Hello Hono!')
})
app.route('/api/v1',userRouter)

export default app
