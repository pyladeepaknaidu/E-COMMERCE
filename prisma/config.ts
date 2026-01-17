/**
 * Prisma configuration file for Prisma 7+
 * Connection URLs are configured here instead of schema.prisma
 */
import { defineConfig, env } from "prisma/config"

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: env("DATABASE_URL"),
    },
})
