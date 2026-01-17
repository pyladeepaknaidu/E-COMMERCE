/**
 * Prisma configuration file for Prisma 7+
 * Connection URLs are configured here instead of schema.prisma
 * This file must be in the ROOT directory, not in prisma/ folder
 */
import { defineConfig, env } from "prisma/config"

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: env("DATABASE_URL") || "postgresql://postgres:Deepak%40123@localhost:5432/gocart?schema=public",
    },
})

