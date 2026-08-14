# 🚀 Supabase Storage Setup Guide

আপনার প্রজেক্টে Supabase Storage successfully implement করা হয়েছে। এখন শুধু Supabase Dashboard থেকে API keys নিয়ে configuration complete করতে হবে।

---

## ✅ Step 1: Supabase Dashboard এ যান

1. Visit: **https://supabase.com/dashboard**
2. Login করুন আপনার account দিয়ে
3. Select করুন প্রজেক্ট: **drphxcjhonrumzkfblem**

---

## 🔑 Step 2: API Keys সংগ্রহ করুন

### A. Project URL এবং Anon Key পান:

1. Left sidebar থেকে **Settings** → **API** এ যান
2. নিচের information কপি করুন:

   **Project URL:**
   ```
   https://drphxcjhonrumzkfblem.supabase.co
   ```

   **anon / public key:** (Public এ যেকোনো read operation এর জন্য)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
   ```

### B. Service Role Key পান:

   **⚠️ Warning:** এই key খুবই powerful এবং sensitive!
   
   Same API page এ scroll করে **service_role** key কপি করুন:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N...
   ```

---

## 📦 Step 3: Storage Bucket তৈরি করুন

1. Left sidebar থেকে **Storage** এ যান
2. Click করুন **"New bucket"** button
3. Bucket configuration:
   - **Name:** `website-images`
   - **Public bucket:** ✅ **Enable করুন** (যাতে images publicly accessible হয়)
   - **File size limit:** 5MB (optional)
   - **Allowed MIME types:** `image/jpeg, image/png, image/webp, image/gif`

4. Click **"Create bucket"**

---

## 🔐 Step 4: Storage Policies Setup করুন

Bucket তৈরি করার পর policies configure করতে হবে:

### Policy 1: Public Read Access (সবাই ছবি দেখতে পারবে)

1. **Storage** → **Policies** → **"website-images"** bucket select করুন
2. Click **"New Policy"**
3. Select **"For full customization"** 
4. নিচের configuration দিন:

   **Policy Name:** `Public Read Access`
   
   **Allowed operation:** SELECT (read)
   
   **Target roles:** `public` (anon users)
   
   **Policy definition:** (SQL)
   ```sql
   true
   ```
   
   অথবা simple template ব্যবহার করতে পারেন:
   - Select **"Enable read access for all users"**

### Policy 2: Authenticated Upload (শুধু admin upload করতে পারবে)

1. Click **"New Policy"** আবার
2. Configuration:

   **Policy Name:** `Authenticated Upload`
   
   **Allowed operation:** INSERT (upload)
   
   **Target roles:** `authenticated`
   
   **Policy definition:**
   ```sql
   true
   ```

   অথবা:
   - Select **"Enable insert for authenticated users only"**

### Policy 3: Authenticated Delete (শুধু admin delete করতে পারবে)

1. Click **"New Policy"** আবার
2. Configuration:

   **Policy Name:** `Authenticated Delete`
   
   **Allowed operation:** DELETE
   
   **Target roles:** `authenticated`
   
   **Policy definition:**
   ```sql
   true
   ```

---

## 🔧 Step 5: .env File Update করুন

আপনার local `.env` file খুলুন এবং নিচের values replace করুন:

```bash
# Supabase Configuration
SUPABASE_URL="https://drphxcjhonrumzkfblem.supabase.co"
SUPABASE_ANON_KEY="YOUR_ACTUAL_ANON_KEY_HERE"
SUPABASE_SERVICE_ROLE_KEY="YOUR_ACTUAL_SERVICE_ROLE_KEY_HERE"
```

**⚠️ Important:**
- `SUPABASE_ANON_KEY` → Dashboard থেকে কপি করা **anon/public** key
- `SUPABASE_SERVICE_ROLE_KEY` → Dashboard থেকে কপি করা **service_role** key

---

## 🧪 Step 6: Test করুন

### Local Development Test:

1. Terminal এ run করুন:
   ```bash
   npm run dev
   ```

2. Browser এ open করুন: `http://localhost:5173`

3. Navigate করুন: **Admin page** → Login করুন
   - Username: `admin@gmail.com`
   - Password: `admin123`

4. যেকোনো section এ photo upload করার চেষ্টা করুন:
   - **Destinations** section
   - **Home Slides**
   - **Team Members**
   - ইত্যাদি

5. Upload করার সময় notice করবেন:
   - Upload button এ loading spinner দেখাবে
   - Success message আসবে: "Image uploaded successfully to cloud storage!"
   - URL automatically field এ set হয়ে যাবে
   - Image preview দেখতে পারবেন

### Verification:

1. Supabase Dashboard → **Storage** → **website-images** bucket
2. **uploads/** folder এ আপনার uploaded images দেখতে পারবেন
3. Image URL format হবে:
   ```
   https://drphxcjhonrumzkfblem.supabase.co/storage/v1/object/public/website-images/uploads/1234567890-abc123-image.jpg
   ```

---

## 🌐 Step 7: Production Deployment

Vercel বা অন্য hosting এ deploy করার সময়:

### Vercel Environment Variables:

1. Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. নিচের variables add করুন:

   ```
   SUPABASE_URL=https://drphxcjhonrumzkfblem.supabase.co
   SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   JWT_SECRET=your_jwt_secret_here
   DATABASE_URL=your_database_url
   DIRECT_URL=your_direct_url
   NODE_ENV=production
   ```

3. **Save** করুন এবং redeploy করুন

---

## 📊 Benefits আপনি পাবেন:

✅ **আগে (Base64):**
- Image size: ~100KB → Base64: ~133KB
- LocalStorage limit: 5-10MB total
- Slow page loading
- Database এ বড় JSON data
- No CDN caching

✅ **এখন (Supabase Storage):**
- Direct URLs থেকে serve হয়
- Unlimited storage (Free tier: 1GB)
- Fast CDN delivery
- Automatic image optimization
- Browser caching support
- Database এ শুধু URL strings

---

## 🔒 Security Features:

1. **Row Level Security (RLS)**: Supabase automatic security provide করে
2. **Authentication**: শুধু logged-in admin/editor/super admin upload করতে পারবে
3. **Public Read**: সবাই images দেখতে পারবে (SEO friendly)
4. **Service Role Key**: Server-side operations এর জন্য secure

---

## 🐛 Troubleshooting:

### Problem 1: Upload fails with 403 error
**Solution:** Check করুন:
- Storage bucket properly তৈরি করা হয়েছে কিনা
- Bucket name exactly `website-images` কিনা
- Policies correctly configure করা আছে কিনা

### Problem 2: Images not displaying
**Solution:**
- Bucket কি **Public** করা আছে?
- Read policy enable করা আছে?
- URL format check করুন browser console এ

### Problem 3: "Unauthorized" error
**Solution:**
- `.env` file এ keys correctly পেস্ট করা আছে?
- Server restart করেছেন?
- Admin panel এ login করা আছেন?

---

## 📞 Support:

যদি কোনো সমস্যা হয়:
1. Supabase Dashboard → **Logs** check করুন
2. Browser console check করুন (F12)
3. Terminal logs দেখুন

---

## 🎉 Congratulations!

আপনার website এ এখন professional cloud storage system আছে! 

Upload করা images:
- Fast delivery (CDN)
- Optimized performance
- Scalable storage
- Cost-effective (free 1GB)

Happy Coding! 🚀
