# Database Setup Guide for FLASH MAN

## Understanding Database URLs

**PgAdmin is a database management tool**, not a database service. You need an actual **PostgreSQL database** to connect to.

## What You Need

You need a **PostgreSQL database** - here are your options:

---

## 🎯 **RECOMMENDED: Free Cloud PostgreSQL (Easiest)**

### **Option 1: Supabase (FREE & Easy)**
1. Go to https://supabase.com
2. Sign up for free
3. Create a new project
4. Go to **Settings** → **Database**
5. Copy the connection strings:

```env
# Use the "Connection pooling" URL for DATABASE_URL
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Use the "Direct connection" URL for DIRECT_URL
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### **Option 2: Neon (FREE Serverless PostgreSQL)**
1. Go to https://neon.tech
2. Sign up for free
3. Create a new project
4. Copy the connection string (shown in dashboard):

```env
DATABASE_URL="postgresql://[user]:[password]@[neon-hostname]/neondb?sslmode=require"
DIRECT_URL="postgresql://[user]:[password]@[neon-hostname]/neondb?sslmode=require"
```

### **Option 3: Railway (FREE tier)**
1. Go to https://railway.app
2. Sign up
3. Create new project → Add PostgreSQL
4. Copy connection string from Variables tab:

```env
DATABASE_URL="postgresql://postgres:[password]@[host]:[port]/railway"
DIRECT_URL="postgresql://postgres:[password]@[host]:[port]/railway"
```

---

## 💻 **Local PostgreSQL (If You Have PostgreSQL Installed)**

If you have PostgreSQL installed on your computer:

### Step 1: Create a database in PgAdmin or psql
```sql
CREATE DATABASE flashman;
```

### Step 2: Use this connection string format:
```env
DATABASE_URL="postgresql://[username]:[password]@localhost:5432/flashman?schema=public"
DIRECT_URL="postgresql://[username]:[password]@localhost:5432/flashman?schema=public"
```

**Default credentials** (if you haven't changed them):
- Username: `postgres`
- Password: (the password you set during PostgreSQL installation)
- Port: `5432`
- Database: `gocart` (create this first)

### How to get connection string from PgAdmin:
1. Right-click on your database in PgAdmin
2. Select **Properties**
3. Check the **Connection** tab for host, port, database name
4. Format: `postgresql://username:password@host:port/database`

---

## 📝 **Setting Up Your .env File**

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add your database URLs:

```env
# Replace with your actual connection strings
DATABASE_URL="your-database-connection-string-here"
DIRECT_URL="your-direct-connection-string-here"

# JWT Secret for authentication
JWT_SECRET="your-secret-key-change-in-production"
```

**Important Notes:**
- For most cloud providers, `DATABASE_URL` and `DIRECT_URL` can be **the same**
- For Supabase, use the pooled URL for `DATABASE_URL` and direct URL for `DIRECT_URL`
- **Never commit `.env` file to git** (it's already in `.gitignore`)

---

## ✅ **After Setting Up**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

3. **Run migrations (create tables):**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Start your app:**
   ```bash
   npm run dev
   ```

---

## 🔍 **Quick Check: What Database Do You Have?**

### If you have PostgreSQL installed locally:
- Use **Option: Local PostgreSQL** above
- Get connection details from PgAdmin or check your PostgreSQL config

### If you don't have PostgreSQL installed:
- Use **Option 1: Supabase** (recommended - easiest and free)
- Or any other free cloud PostgreSQL provider

---

## ❓ **Still Confused?**

**PgAdmin is just a tool** - you need an actual PostgreSQL database to connect to.

**Choose the easiest option:**
1. Sign up at https://supabase.com (free)
2. Create a project
3. Copy the connection strings to your `.env` file
4. Run `npx prisma migrate dev`

That's it! 🚀
