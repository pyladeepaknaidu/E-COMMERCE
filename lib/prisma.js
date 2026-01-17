import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// Create a singleton Prisma Client instance for Prisma 7+
// Prisma 7 requires an adapter - using PostgreSQL adapter
let prisma

const createPrismaClient = () => {
    // Create PostgreSQL connection pool
    const connectionString = process.env.DATABASE_URL
    const pool = new Pool({ connectionString })
    
    // Create Prisma adapter
    const adapter = new PrismaPg(pool)
    
    // Prisma 7 requires adapter to be passed to constructor
    return new PrismaClient({ adapter })
}

if (process.env.NODE_ENV === 'production') {
    prisma = createPrismaClient()
} else {
    // In development, use global to prevent multiple instances during hot reload
    if (!global.prisma) {
        global.prisma = createPrismaClient()
    }
    prisma = global.prisma
}

export default prisma
