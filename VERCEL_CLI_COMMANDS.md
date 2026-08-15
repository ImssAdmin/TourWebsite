# Vercel CLI দিয়ে Environment Variables Add করার নির্দেশনা

## Option 1: Automated Script (সবচেয়ে সহজ)

```bash
# Project directory তে যান
cd /Users/user/Documents/MyProject/TourWebsite

# Script run করুন
./setup-vercel-env.sh
```

এই script:
1. ✅ Vercel CLI install করবে (যদি না থাকে)
2. ✅ Vercel login করবে
3. ✅ সব environment variables add করবে
4. ✅ Automatically redeploy করবে

---

## Option 2: Manual Commands (একটা একটা করে)

### Step 1: Vercel CLI Install করুন

```bash
npm install -g vercel
```

### Step 2: Vercel Login করুন

```bash
cd /Users/user/Documents/MyProject/TourWebsite
vercel login
```

### Step 3: Environment Variables Add করুন

#### DATABASE_URL
```bash
vercel env add DATABASE_URL production
# Paste this value:
postgresql://postgres.drphxcjhonrumzkfblem:lm%2820J3q%2Ch%21R@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true

vercel env add DATABASE_URL preview
# Same value paste করুন

vercel env add DATABASE_URL development
# Same value paste করুন
```

#### DIRECT_URL
```bash
vercel env add DIRECT_URL production
# Paste this value:
postgresql://postgres.drphxcjhonrumzkfblem:lm%2820J3q%2Ch%21R@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres

vercel env add DIRECT_URL preview
vercel env add DIRECT_URL development
```

#### JWT_SECRET
```bash
vercel env add JWT_SECRET production
# Paste: jsadfkljsdfiisadfsdabfsdk

vercel env add JWT_SECRET preview
vercel env add JWT_SECRET development
```

#### SUPABASE_URL
```bash
vercel env add SUPABASE_URL production
# Paste: https://drphxcjhonrumzkfblem.supabase.co

vercel env add SUPABASE_URL preview
vercel env add SUPABASE_URL development
```

#### SUPABASE_ANON_KEY
```bash
vercel env add SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycGh4Y2pob25ydW16a2ZibGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMjUwNTQsImV4cCI6MjA5ODcwMTA1NH0.Jh4BXqdzABSwkEiBFJUWtP8-otURrZsbH58nDaL9dTs

vercel env add SUPABASE_ANON_KEY preview
vercel env add SUPABASE_ANON_KEY development
```

#### SUPABASE_SERVICE_ROLE_KEY
```bash
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycGh4Y2pob25ydW16a2ZibGVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzEyNTA1NCwiZXhwIjoyMDk4NzAxMDU0fQ.XCPkTmJQF311VVEm4HAZVUPRQObGHgnDY9zkaEmFqIk

vercel env add SUPABASE_SERVICE_ROLE_KEY preview
vercel env add SUPABASE_SERVICE_ROLE_KEY development
```

### Step 4: Redeploy করুন

```bash
vercel redeploy --prod
```

---

## Option 3: Vercel Dashboard (সবচেয়ে সহজ - GUI)

যদি CLI তে সমস্যা হয়, তাহলে:

1. Browser এ যান: https://vercel.com/imssadmin/tour-website/settings/environment-variables
2. "Add New" button click করুন
3. উপরের values গুলো একটা একটা করে add করুন
4. Save করুন

---

## Verify করুন

Environment variables add হয়েছে কিনা check করতে:

```bash
vercel env ls
```

---

## ⚠️ Important Notes

1. প্রতিটি variable এর জন্য **তিনটি environment** add করতে হবে:
   - Production
   - Preview  
   - Development

2. Variables add করার পর Vercel automatically redeploy শুরু করবে

3. Deployment complete হতে 2-3 minutes লাগবে

4. Deployment status check করুন: https://vercel.com/imssadmin/tour-website/deployments

---

## Troubleshooting

যদি `vercel env add` কাজ না করে:

```bash
# Force flag ব্যবহার করুন
echo "YOUR_VALUE" | vercel env add VARIABLE_NAME production --force
```

অথবা interactive mode disable করুন:

```bash
vercel env add VARIABLE_NAME production --value="YOUR_VALUE"
```
