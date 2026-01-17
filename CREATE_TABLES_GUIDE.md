# How to Create Tables in Your PostgreSQL Database

## ✅ Step-by-Step Guide

Since you've already created your database in PostgreSQL, follow these steps to create all tables (User, Product, Order, etc.):

---

## 📝 Step 1: Create `.env` File

1. **Create a file named `.env`** in your project root (same folder as `package.json`)

2. **Get your PostgreSQL connection details** from PgAdmin:
   - Right-click on your database → **Properties** → **Connection** tab
   - Note down: Host, Port, Database name, Username
   - Your password is the one you set during PostgreSQL installation

3. **Add this to your `.env` file** (replace with your actual values):

```env
# PostgreSQL Connection String
# Format: postgresql://username:password@host:port/database_name?schema=public
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/your_database_name?schema=public"
DIRECT_URL="postgresql://postgres:your_password@localhost:5432/your_database_name?schema=public"

# JWT Secret for authentication
JWT_SECRET="your-secret-key-change-in-production"
```

### Example (if your database name is `gocart`):
```env
DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/gocart?schema=public"
DIRECT_URL="postgresql://postgres:mypassword123@localhost:5432/gocart?schema=public"
JWT_SECRET="my-super-secret-jwt-key-12345"
```

---

## 🔧 Step 2: Install Dependencies

If you haven't already, install all required packages:

```bash
npm install
```

This installs:
- `@prisma/client` - Prisma client for database queries
- `prisma` - Prisma CLI for migrations
- `bcryptjs` - For password hashing (login)
- `jsonwebtoken` - For JWT tokens (login)

---

## 🎯 Step 3: Generate Prisma Client

Generate the Prisma Client based on your schema:

```bash
npx prisma generate
```

**What this does:** Creates the Prisma Client code that will be used in your API routes.

---

## 🚀 Step 4: Run Migrations (Create Tables)

This command will create **ALL tables** in your database:

```bash
npx prisma migrate dev --name init
```

**What this does:**
- ✅ Creates all tables based on your `prisma/schema.prisma` file:
  - `User` (with id, name, email, password for login, etc.)
  - `Product`
  - `Order`
  - `OrderItem`
  - `Rating`
  - `Address`
  - `Coupon`
  - `Store`
- ✅ Creates all relationships between tables
- ✅ Adds indexes and constraints

**You'll be asked:**
- "Enter a name for the new migration:" → Type `init` and press Enter
- It will create all tables automatically

---

## ✅ Step 5: Verify Tables Created

### Option A: Check in PgAdmin
1. Open PgAdmin
2. Refresh your database (right-click → Refresh)
3. Expand your database → **Schemas** → **public** → **Tables**
4. You should see all tables:
   - `User`
   - `Product`
   - `Order`
   - `OrderItem`
   - `Rating`
   - `Address`
   - `Coupon`
   - `Store`
   - `_prisma_migrations` (system table)

### Option B: Use Prisma Studio (Visual Database Browser)
```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can see all your tables and data.

---

## 🎉 Step 6: Start Your App

```bash
npm run dev
```

Now your app is ready! You can:
- Register users at `/signup`
- Login at `/login`
- All data will be saved in your PostgreSQL database!

---

## 📊 What Tables Will Be Created?

Based on your `prisma/schema.prisma`, these tables will be created:

1. **User** - For login/authentication
   - id, name, email, password (hashed), image, cart

2. **Product** - Products in the store
   - id, name, description, mrp, price, images, category, inStock

3. **Store** - Vendor stores
   - id, name, username, email, logo, status, isActive

4. **Order** - Customer orders
   - id, total, status, userId, storeId, paymentMethod

5. **OrderItem** - Items in each order
   - orderId, productId, quantity, price

6. **Rating** - Product ratings/reviews
   - id, rating, review, userId, productId

7. **Address** - Customer addresses
   - id, userId, name, street, city, state, zip, country

8. **Coupon** - Discount coupons
   - code, description, discount, forNewUser, expiresAt

---

## ❗ Troubleshooting

### Error: "Connection refused" or "Cannot connect to database"
- ✅ Check your `.env` file has correct credentials
- ✅ Make sure PostgreSQL is running
- ✅ Verify database name, username, password, and port (usually 5432)

### Error: "Database does not exist"
- ✅ Create the database first in PgAdmin
- ✅ Update `.env` with the correct database name

### Error: "Authentication failed"
- ✅ Check username and password in `.env`
- ✅ Try connecting with PgAdmin using the same credentials

---

## 🎯 Quick Summary

```bash
# 1. Create .env file with your database connection
# 2. Install dependencies
npm install

# 3. Generate Prisma Client
npx prisma generate

# 4. Create all tables
npx prisma migrate dev --name init

# 5. Start your app
npm run dev
```

That's it! Your User table (and all other tables) will be created in your PostgreSQL database! 🚀
