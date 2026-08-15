# ⚠️ Vercel Environment Variables প্রয়োজন!

## সমস্যা
Vercel deployment fail হচ্ছে কারণ database connection string environment variables সেট করা নেই।

## সমাধান: Vercel Dashboard এ Environment Variables Add করুন

### ধাপ ১: Vercel Dashboard এ যান
1. https://vercel.com/imssadmin/tour-website/settings/environment-variables
2. অথবা: Vercel Dashboard → Your Project → Settings → Environment Variables

### ধাপ ২: নিচের Environment Variables যোগ করুন

#### Database Configuration (Required)
```
DATABASE_URL
Value: postgresql://postgres.drphxcjhonrumzkfblem:lm%2820J3q%2Ch%21R@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
Environment: Production, Preview, Development
```

```
DIRECT_URL
Value: postgresql://postgres.drphxcjhonrumzkfblem:lm%2820J3q%2Ch%21R@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
Environment: Production, Preview, Development
```

#### JWT Secret (Required)
```
JWT_SECRET
Value: jsadfkljsdfiisadfsdabfsdk
Environment: Production, Preview, Development
```

#### Supabase Configuration (Required)
```
SUPABASE_URL
Value: https://drphxcjhonrumzkfblem.supabase.co
Environment: Production, Preview, Development
```

```
SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycGh4Y2pob25ydW16a2ZibGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMjUwNTQsImV4cCI6MjA5ODcwMTA1NH0.Jh4BXqdzABSwkEiBFJUWtP8-otURrZsbH58nDaL9dTs
Environment: Production, Preview, Development
```

```
SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycGh4Y2pob25ydW16a2ZibGVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzEyNTA1NCwiZXhwIjoyMDk4NzAxMDU0fQ.XCPkTmJQF311VVEm4HAZVUPRQObGHgnDY9zkaEmFqIk
Environment: Production, Preview, Development
```

#### App URL (Optional)
```
APP_URL
Value: https://idealskytours.com
Environment: Production, Preview, Development
```

### ধাপ ৩: Save এবং Redeploy
1. সব environment variables add করার পর **Save** করুন
2. Vercel automatically redeploy করবে
3. অথবা manual redeploy করতে: **Deployments** → Latest deployment → **Redeploy**

### ধাপ ৪: Deployment Check করুন
- Deployment শেষ হলে admin dashboard test করুন
- Hero slider image change করুন
- Save করুন
- Page reload করুন
- Image persist করছে কিনা check করুন

## দ্রুত সমাধান (Quick Fix)
Vercel CLI দিয়ে একবারে সব variables set করতে পারেন:

```bash
# প্রথমে Vercel CLI install করুন (যদি না থাকে)
npm i -g vercel

# Project directory তে যান
cd /Users/user/Documents/MyProject/TourWebsite

# Environment variables pull করুন এবং তারপর push করুন
vercel env pull
# .env file edit করুন
vercel env add DATABASE_URL
# prompt এ value paste করুন
```

## আরও সাহায্য
যদি কোন সমস্যা হয়, Vercel logs check করুন:
https://vercel.com/imssadmin/tour-website/deployments

---
**নোট**: এই file টি sensitive information রয়েছে। Production এ যাওয়ার পর এই file delete করে দিন।
