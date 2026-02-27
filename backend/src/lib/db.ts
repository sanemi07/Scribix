import { PrismaClient } from '../generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

export const getPrisma = (accelerateUrl: string) =>
  new PrismaClient({
    accelerateUrl,
  }).$extends(withAccelerate())
