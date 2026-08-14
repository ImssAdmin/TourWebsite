# 🔑 Supabase API Keys কোথায় পাবেন?

## Quick Steps:

### 1️⃣ Supabase Dashboard এ Login করুন
👉 https://supabase.com/dashboard

### 2️⃣ আপনার Project Select করুন
Project: **drphxcjhonrumzkfblem**

### 3️⃣ API Keys পাওয়ার জন্য:

**Left Sidebar** → **Settings** ⚙️ → **API** 

এখানে পাবেন:

---

## 📋 Copy করার Keys:

### A. Project URL:
```
https://drphxcjhonrumzkfblem.supabase.co
```
✅ ইতিমধ্যে আপনার `.env` file এ add করা আছে

---

### B. ANON KEY (Project API keys section):
```
Look for: anon / public
```
এটি একটা long JWT token যা দেখতে এরকম:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```

**📝 Copy করুন এবং paste করুন:**
`.env` file এ → `SUPABASE_ANON_KEY="..."`

---

### C. SERVICE ROLE KEY (Project API keys section):
```
Look for: service_role
```
⚠️ **SECRET KEY - Never share publicly!**

এটিও একটা JWT token:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```

**📝 Copy করুন এবং paste করুন:**
`.env` file এ → `SUPABASE_SERVICE_ROLE_KEY="..."`

---

## 🎯 Final .env Configuration:

আপনার `.env` file এরকম দেখাবে:

```bash
# Supabase Configuration
SUPABASE_URL="https://drphxcjhonrumzkfblem.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ACTUAL_KEY"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ACTUAL_KEY"
```

---

## ✅ Verification:

Keys সঠিক কিনা check করতে:
1. Terminal এ: `npm run dev`
2. Admin panel এ login করুন
3. একটা image upload করার চেষ্টা করুন
4. যদি success message আসে → ✅ Perfect!

---

## 🏗️ Storage Bucket Setup:

Keys পাওয়ার পর:

1. **Left Sidebar** → **Storage** 🗄️
2. Click **"New bucket"**
3. Name: `website-images`
4. ✅ Public bucket: **Enable**
5. Click **"Create bucket"**

**Policies Setup:**
- Read access: **Public** (everyone can view)
- Upload access: **Authenticated only**
- Delete access: **Authenticated only**

---

## 📸 Screenshot Reference:

### API Keys Location:
```
Dashboard
  └── Settings (⚙️)
      └── API
          ├── Project URL ✅
          ├── anon key ✅
          └── service_role key ✅
```

### Storage Location:
```
Dashboard
  └── Storage (🗄️)
      └── Buckets
          └── New bucket → "website-images"
```

---

**Need help?** Check: `SUPABASE_STORAGE_SETUP.md` for detailed guide.
