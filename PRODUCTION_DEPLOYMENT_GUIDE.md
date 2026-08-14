# 🚀 Production Deployment Guide

Complete guide for deploying your Premium Visa Consultancy website to production.

---

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Setup

আপনার production environment এ নিচের variables configure করতে হবে:

```bash
# Supabase Configuration
SUPABASE_URL=https://drphxcjhonrumzkfblem.supabase.co
SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here

# Database Configuration
DATABASE_URL=your_database_url_with_pooler
DIRECT_URL=your_direct_database_url

# Authentication
JWT_SECRET=your_secure_jwt_secret_key

# Node Environment
NODE_ENV=production
```

### 2. Update Domain URLs

নিচের files এ `your-domain.com` replace করুন আপনার actual domain দিয়ে:

- `/index.html` - Open Graph URLs
- `/public/sitemap.xml` - All page URLs
- `/public/robots.txt` - Sitemap URL
- `/src/utils/structuredData.ts` - All schema URLs

**Find and Replace:**
```bash
# MacOS/Linux
find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" -o -name "*.ts" \) -exec sed -i '' 's/your-domain\.com/actualvisa.com/g' {} +

# Manual replacement recommended for accuracy
```

### 3. Business Information Update

`/src/utils/structuredData.ts` এ আপনার actual business information দিন:

- ✏️ Company name
- ✏️ Phone number
- ✏️ Email address
- ✏️ Office address
- ✏️ GPS coordinates
- ✏️ Social media links
- ✏️ Opening hours

### 4. Favicon & Images Setup

- ✅ Favicon files তৈরি করুন (দেখুন: `FAVICON_SETUP.md`)
- ✅ OG image (1200x630px) upload করুন: `/public/og-image.jpg`
- ✅ সব icon files `/public` folder এ রাখুন

---

## 🌐 Deployment Options

### Option A: Vercel Deployment (Recommended)

#### Step 1: Vercel CLI Install করুন

```bash
npm install -g vercel
```

#### Step 2: Project Initialize

```bash
cd /Users/user/Documents/MyProject/TourWebsite
vercel login
vercel
```

#### Step 3: Environment Variables Set করুন

Vercel Dashboard → Your Project → Settings → Environment Variables

নিচের variables add করুন (সব 3টি environment এর জন্য: Production, Preview, Development):

```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL
DIRECT_URL
JWT_SECRET
NODE_ENV=production
```

#### Step 4: Deploy

```bash
# Production deployment
vercel --prod

# Preview deployment (test first)
vercel
```

**Vercel Configuration:**

`vercel.json` already configured আছে:
- ✅ Serverless functions for API routes
- ✅ SPA fallback routing
- ✅ Upload timeout increased to 60s

---

### Option B: Traditional VPS/Server Deployment

#### Requirements:
- Node.js 18+ installed
- PM2 process manager
- Nginx web server
- SSL certificate (Let's Encrypt)

#### Step 1: Server Setup

```bash
# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx
```

#### Step 2: Project Upload

```bash
# On local machine
rsync -avz --exclude 'node_modules' --exclude '.git' \
  /Users/user/Documents/MyProject/TourWebsite \
  user@your-server-ip:/var/www/

# On server
cd /var/www/TourWebsite
npm install
npm run build
```

#### Step 3: Environment Variables

```bash
# Create .env file on server
nano .env

# Paste all environment variables
# Save and exit (Ctrl+X, Y, Enter)
```

#### Step 4: PM2 Process Setup

```bash
# Start application with PM2
pm2 start dist/server.cjs --name visa-website

# Enable startup on boot
pm2 startup
pm2 save

# Monitor
pm2 logs visa-website
```

#### Step 5: Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/visa-website
```

**Nginx config:**

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API routes timeout increased for image upload
    location /api/upload {
        proxy_pass http://localhost:5173;
        proxy_read_timeout 120s;
        proxy_connect_timeout 120s;
        proxy_send_timeout 120s;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:5173;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Enable site:**

```bash
sudo ln -s /etc/nginx/sites-available/visa-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 6: SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

---

## 🗄️ Database Migration

### Production Database Setup

```bash
# Run Prisma migrations on production
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Verify connection
npx prisma db pull
```

---

## 🔐 Security Checklist

### Before Going Live:

- ✅ Strong JWT_SECRET generated (minimum 32 characters)
- ✅ Database credentials secured
- ✅ Supabase RLS policies enabled
- ✅ Admin default password changed
- ✅ CORS properly configured
- ✅ Rate limiting enabled (if applicable)
- ✅ HTTPS enabled (SSL certificate)
- ✅ Environment variables NOT committed to git
- ✅ `.env` file in `.gitignore`

### Generate Secure JWT Secret:

```bash
# Generate random 64-character secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📊 Post-Deployment Verification

### 1. Functional Testing

Test করুন:
- ✅ Home page loads
- ✅ All navigation links working
- ✅ Language toggle (EN/BN) working
- ✅ Contact form submission
- ✅ Admin login
- ✅ Image upload (admin panel)
- ✅ WhatsApp button working

### 2. SEO Verification

#### Check Meta Tags:
```bash
# View page source
curl https://your-domain.com | grep -i "meta"
```

Verify করুন:
- ✅ Title tag present
- ✅ Description meta tag
- ✅ Open Graph tags
- ✅ Twitter card tags
- ✅ Canonical URL

#### Check robots.txt:
```
https://your-domain.com/robots.txt
```

#### Check sitemap.xml:
```
https://your-domain.com/sitemap.xml
```

#### Check Structured Data:

**Google Rich Results Test:**
https://search.google.com/test/rich-results

Enter your domain URL and check:
- ✅ Organization schema
- ✅ Local Business schema
- ✅ FAQ schema (on home page)

### 3. Performance Testing

#### Google PageSpeed Insights:
https://pagespeed.web.dev/

Target scores:
- 🎯 Performance: 90+
- 🎯 Accessibility: 90+
- 🎯 Best Practices: 90+
- 🎯 SEO: 95+

#### GTmetrix:
https://gtmetrix.com/

Check:
- ✅ Fully loaded time < 3s
- ✅ Total page size < 3MB
- ✅ Requests < 50

### 4. Mobile Responsiveness

Test on:
- ✅ iPhone (Safari)
- ✅ Android (Chrome)
- ✅ iPad (Safari)

**Google Mobile-Friendly Test:**
https://search.google.com/test/mobile-friendly

### 5. Cross-Browser Testing

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 🔍 Google Search Console Setup

### Step 1: Verify Ownership

1. Go to: https://search.google.com/search-console
2. Add property: `https://your-domain.com`
3. Verification methods:
   - HTML file upload
   - DNS record
   - Google Analytics
   - Google Tag Manager

### Step 2: Submit Sitemap

```
https://your-domain.com/sitemap.xml
```

### Step 3: Request Indexing

- Submit homepage for indexing
- Submit all important pages

**Expected indexing time:** 1-7 days

---

## 📈 Analytics Setup (Optional)

### Google Analytics 4

1. Create GA4 property: https://analytics.google.com/
2. Get Measurement ID: `G-XXXXXXXXXX`
3. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Facebook Pixel (Optional)

Business page এ ads run করলে Facebook Pixel add করতে পারেন.

---

## 🐛 Troubleshooting

### Issue 1: Build Fails

**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Issue 2: API Routes 404

**Solution:**
- Check `vercel.json` configuration
- Verify API files in `/api` folder
- Check function logs in Vercel dashboard

### Issue 3: Images Not Loading

**Solution:**
- Verify Supabase storage bucket is public
- Check CORS settings in Supabase
- Verify environment variables

### Issue 4: Database Connection Error

**Solution:**
- Verify `DATABASE_URL` is correct
- Check database is accessible from deployment server
- Run `npx prisma generate` after deployment

### Issue 5: Admin Login Not Working

**Solution:**
- Verify `JWT_SECRET` is set
- Check database has admin user
- Clear cookies and try again

---

## 🔄 Continuous Deployment

### GitHub Actions (Automatic Deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📝 Maintenance Tasks

### Weekly:
- ✅ Check error logs
- ✅ Monitor server resources
- ✅ Review contact form submissions

### Monthly:
- ✅ Update dependencies: `npm update`
- ✅ Check Google Search Console for issues
- ✅ Review analytics data
- ✅ Backup database

### As Needed:
- ✅ Update content via admin panel
- ✅ Add new team members
- ✅ Update visa information
- ✅ Respond to contact inquiries

---

## 🎉 Launch Checklist

Final checklist before announcing:

- ✅ All pages tested and working
- ✅ Contact form tested (receive email)
- ✅ SSL certificate active (HTTPS)
- ✅ Favicon visible in browser
- ✅ Social media preview working (OG image)
- ✅ Google Search Console verified
- ✅ Sitemap submitted
- ✅ Analytics tracking working
- ✅ Mobile responsive on all devices
- ✅ All images optimized and loading
- ✅ Admin panel secured
- ✅ Backup system in place
- ✅ Domain DNS properly configured
- ✅ Error monitoring enabled

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **React Docs:** https://react.dev/

---

## 🚀 You're Ready to Launch!

Your website is now production-ready with:
- ✅ Full SEO optimization
- ✅ Performance optimization
- ✅ Security best practices
- ✅ Structured data for rich snippets
- ✅ Mobile responsive design
- ✅ Cloud storage for images
- ✅ Professional admin panel

**Good luck with your visa consultancy business!** 🎉
