import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

export const getPrisma = (database_url: string) => {
  return new PrismaClient({
    datasourceUrl: database_url,
  }).$extends(withAccelerate())
}
