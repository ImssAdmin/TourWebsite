# 🔧 Vercel Environment Variables Setup - Fix Guide

আপনার current error fix করার জন্য step-by-step guide।

---

## ❌ Current Errors

```
Error: supabaseUrl is required.
Error: DATABASE_URL must start with the protocol `postgresql://` or `postgres://`
```

**কারণ:** Vercel dashboard এ environment variables সঠিকভাবে set করা নেই।

---

## ✅ Solution: Vercel Dashboard এ Environment Variables Set করুন

### Step 1: Vercel Dashboard এ যান

1. Login করুন: https://vercel.com/dashboard
2. আপনার project select করুন: **tour-website**
3. যান: **Settings** → **Environment Variables**

### Step 2: সব Environment Variables Add করুন

নিচের **সব variables** add করুন:

#### 1. SUPABASE_URL
```
SUPABASE_URL
```
**Value:**
```
https://drphxcjhonrumzkfblem.supabase.co
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

#### 2. SUPABASE_ANON_KEY
```
SUPABASE_ANON_KEY
```
**Value:** (Supabase Dashboard → Settings → API থেকে copy করুন)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycGh4Y2pob25ydW16a2ZibGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NzI0NjcsImV4cCI6MjA1NTQ0ODQ2N30.YOUR_ACTUAL_KEY_HERE
```
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

#### 3. SUPABASE_SERVICE_ROLE_KEY
```
SUPABASE_SERVICE_ROLE_KEY
```
**Value:** (Supabase Dashboard → Settings → API → service_role key)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycGh4Y2pob25ydW16a2ZibGVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTg3MjQ2NywiZXhwIjoyMDU1NDQ4NDY3fQ.YOUR_ACTUAL_KEY_HERE
```
**⚠️ Important:** এই key খুবই sensitive!
**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

#### 4. DATABASE_URL
```
DATABASE_URL
```
**Value:** (Supabase Dashboard → Settings → Database → Connection String → Transaction Pooler)

**Format:**
```
postgresql://postgres.drphxcjhonrumzkfblem:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

**⚠️ Important:** 
- `[YOUR-PASSWORD]` আপনার database password দিয়ে replace করুন
- URL শুরু হতে হবে `postgresql://` দিয়ে
- `?pgbouncer=true&connection_limit=1` শেষে থাকতে হবে

**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

#### 5. DIRECT_URL
```
DIRECT_URL
```
**Value:** (Supabase Dashboard → Settings → Database → Connection String → Session Mode)

**Format:**
```
postgresql://postgres.drphxcjhonrumzkfblem:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

**⚠️ Important:**
- এটা direct connection (port 5432)
- Transaction pooler থেকে আলাদা

**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

#### 6. JWT_SECRET
```
JWT_SECRET
```
**Value:** (একটা random strong secret key)
```
your-super-secret-jwt-key-minimum-32-characters-long-random-string
```

**Generate করুন:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Environments:** ✅ Production, ✅ Preview, ✅ Development

---

#### 7. NODE_ENV
```
NODE_ENV
```
**Value:**
```
production
```
**Environments:** ✅ Production only

---

## 📋 Quick Copy-Paste Template

Vercel Dashboard এ একবারে সব variables add করার জন্য:

```env
# Supabase Configuration
SUPABASE_URL=https://drphxcjhonrumzkfblem.supabase.co
SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE

# Database URLs (Supabase থেকে copy করুন)
DATABASE_URL=postgresql://postgres.drphxcjhonrumzkfblem:YOUR_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres.drphxcjhonrumzkfblem:YOUR_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres

# Authentication
JWT_SECRET=your-generated-secret-key-here

# Node Environment
NODE_ENV=production
```

---

## 🔍 কিভাবে Supabase Keys পাবেন

### Supabase Dashboard:
1. যান: https://supabase.com/dashboard
2. Project select করুন: **drphxcjhonrumzkfblem**

### API Keys পেতে:
1. Left sidebar → **Settings** → **API**
2. Copy করুন:
   - **Project URL** → এটা হলো SUPABASE_URL
   - **anon public key** → এটা হলো SUPABASE_ANON_KEY
   - **service_role key** (⚠️ secret) → এটা হলো SUPABASE_SERVICE_ROLE_KEY

### Database Connection Strings পেতে:
1. Left sidebar → **Settings** → **Database**
2. Scroll down → **Connection string** section
3. Copy করুন:
   - **Transaction Pooler** (URI) → এটা হলো DATABASE_URL
   - **Session Mode** (URI) → এটা হলো DIRECT_URL
4. Password replace করুন

---

## 🚀 Variables Set করার পর

### Step 1: Redeploy করুন

Vercel Dashboard এ:
1. **Deployments** tab এ যান
2. Latest deployment এ click করুন
3. তিনটি dot (...) click করুন
4. **Redeploy** select করুন
5. ✅ **Use existing Build Cache** uncheck করুন (fresh build)
6. **Redeploy** button click করুন

**অথবা Command Line থেকে:**
```bash
cd /Users/user/Documents/MyProject/TourWebsite
vercel --prod
```

### Step 2: Verify করুন

Deploy সফল হলে test করুন:
1. যান: https://idealskytours.com
2. Test করুন:
   - ✅ Home page loads
   - ✅ Admin panel login (admin@gmail.com / admin123)
   - ✅ Image upload কাজ করছে কিনা
   - ✅ Contact form submission

---

## 🐛 Still Getting Errors?

### Debug: Check Environment Variables

Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

**Verify করুন:**
- ✅ সব 7টি variables আছে কিনা
- ✅ কোনো variable empty নয়
- ✅ DATABASE_URL শুরু হয় `postgresql://` দিয়ে
- ✅ সব variables এ **Production** environment selected আছে

### Debug: Check Deployment Logs

Vercel Dashboard → **Deployments** → Latest deployment → **Function Logs**

যদি এখনও error থাকে:
1. Screenshot নিন error logs এর
2. Check করুন কোন variable missing বলছে
3. সেই variable আবার add করুন

---

## 📸 Visual Guide

### Vercel Dashboard Navigation:

```
Vercel Dashboard
└── Your Project (tour-website)
    └── Settings (top menu)
        └── Environment Variables (left sidebar)
            └── Add New Variable
                ├── Name: SUPABASE_URL
                ├── Value: https://drphxcjhonrumzkfblem.supabase.co
                └── Environments: [x] Production [x] Preview [x] Development
                    └── Save
```

### Variable Format Check:

✅ **CORRECT:**
```
DATABASE_URL=postgresql://postgres.drphxcjhonrumzkfblem:mypass@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

❌ **WRONG:**
```
DATABASE_URL=postgres.drphxcjhonrumzkfblem  # Missing protocol
DATABASE_URL=                                 # Empty
DATABASE_URL="postgresql://..."               # Has quotes (remove them)
```

---

## ⚡ Quick Fix Command

যদি আপনি terminal থেকে set করতে চান (Vercel CLI):

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
cd /Users/user/Documents/MyProject/TourWebsite
vercel link

# Add environment variables
vercel env add SUPABASE_URL production
# Paste: https://drphxcjhonrumzkfblem.supabase.co

vercel env add SUPABASE_ANON_KEY production
# Paste your anon key

vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Paste your service role key

vercel env add DATABASE_URL production
# Paste your database URL

vercel env add DIRECT_URL production
# Paste your direct URL

vercel env add JWT_SECRET production
# Paste your JWT secret

vercel env add NODE_ENV production
# Type: production

# Redeploy
vercel --prod
```

---

## 🎯 Expected Result

সব variables সঠিকভাবে set করার পর:

```
✅ Build completed successfully
✅ No environment variable errors
✅ API routes working
✅ Database connected
✅ Image upload working
✅ Admin panel accessible
```

**Deployment URL:** https://idealskytours.com

---

## 📞 Need Help?

যদি এখনও সমস্যা হয়:
1. Vercel logs এর screenshot share করুন
2. আমাকে বলুন কোন step এ আটকে আছেন
3. আমি specific solution দিব

---

**Next Step:** Environment variables set করুন এবং redeploy করুন! 🚀
