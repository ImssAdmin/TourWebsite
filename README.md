# 🌐 Premium Visa Consultancy Website

Professional visa consultation platform with multilingual support (English/Bengali), cloud storage integration, and comprehensive admin panel.

**Live Site:** [idealskytours.com](https://idealskytours.com)

---

## ✨ Features

### 🎯 Client-Facing Features
- **Multilingual Support** - English & Bengali
- **Service Pages** - Student Visa, Work Permit, Tourist Visa, Business Visa
- **Interactive Calculators** - Visa eligibility calculator
- **Contact Form** - Direct inquiry submission to database
- **WhatsApp Integration** - Floating CTA button
- **FAQ Section** - Common questions with answers
- **Responsive Design** - Mobile-first, works on all devices

### 🔐 Admin Panel Features
- **Role-Based Access** - Super Admin, Admin, Editor, Viewer
- **Content Management** - Update all website content
- **Image Upload** - Supabase cloud storage integration
- **Contact Management** - View and manage inquiries
- **Customizable Sections**:
  - Home page slides
  - Service categories
  - Team members
  - Destinations
  - Country-specific information

### 🚀 Technical Features
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **Structured Data** - JSON-LD schema for rich snippets
- **Performance Optimized** - Lazy loading, code splitting
- **Cloud Storage** - Supabase for images
- **Database** - PostgreSQL with Prisma ORM
- **Authentication** - JWT-based secure login
- **Modern Stack** - React 19, TypeScript, Vite, TailwindCSS

---

## 📦 Tech Stack

- **Frontend:** React 19, TypeScript, TailwindCSS, Motion
- **Backend:** Node.js, Express, Prisma
- **Database:** PostgreSQL (Supabase)
- **Storage:** Supabase Storage
- **Auth:** JWT with httpOnly cookies
- **Deployment:** Vercel
- **Build Tool:** Vite

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- PostgreSQL database

### 1. Clone Repository

```bash
git clone <repository-url>
cd TourWebsite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create `.env` file in root:

```env
# Supabase Configuration
SUPABASE_URL=https://drphxcjhonrumzkfblem.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database URLs
DATABASE_URL=your_database_url_with_pooler
DIRECT_URL=your_direct_database_url

# Authentication
JWT_SECRET=your_jwt_secret_key

# Node Environment
NODE_ENV=development
```

**📖 Detailed Setup:** See `VERCEL_ENV_SETUP.md` for complete environment setup guide.

### 4. Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### 5. Supabase Storage Setup

Follow instructions in `SUPABASE_STORAGE_SETUP.md` to:
- Create `website-images` bucket
- Configure storage policies
- Enable public access

### 6. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:5173

---

## 🔑 Default Admin Credentials

**Email:** admin@gmail.com  
**Password:** admin123

**⚠️ Important:** Change default password after first login!

---

## 📦 Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

#### Prerequisites:
1. ✅ Supabase bucket created (`website-images`)
2. ✅ Database migrations run
3. ✅ Environment variables prepared

#### Quick Deploy:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd TourWebsite
vercel

# Deploy to production
vercel --prod
```

#### Environment Variables Setup:

**⚠️ CRITICAL:** Set these in Vercel Dashboard before deployment:

1. Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all 7 required variables (see `VERCEL_ENV_SETUP.md`)
3. Ensure all are set for **Production**, **Preview**, and **Development**

**📖 Full Deployment Guide:** See `PRODUCTION_DEPLOYMENT_GUIDE.md`

---

## 🐛 Common Issues & Solutions

### Issue 1: "supabaseUrl is required" Error

**Solution:** Environment variables not set in Vercel Dashboard.  
**Fix:** Follow `VERCEL_ENV_SETUP.md` step-by-step guide.

### Issue 2: "DATABASE_URL must start with postgresql://"

**Solution:** DATABASE_URL format incorrect.  
**Fix:** Ensure URL starts with `postgresql://` (not `postgres://` or empty)

### Issue 3: Image Upload Fails

**Solution:** Supabase bucket not created or policies missing.  
**Fix:** Follow `SUPABASE_STORAGE_SETUP.md` to create bucket and policies.

### Issue 4: Build Fails - "terser not found"

**Solution:** Missing devDependency.  
**Fix:** `npm install -D terser`

---

## 📁 Project Structure

```
TourWebsite/
├── api/                      # API routes (serverless functions)
│   ├── _lib/                # Shared utilities
│   │   ├── auth.ts         # Authentication logic
│   │   ├── prisma.ts       # Database client
│   │   └── supabase.ts     # Storage client
│   ├── contact.ts          # Contact form submission
│   ├── contacts.ts         # Get all contacts
│   ├── data.ts             # Get website data
│   ├── delete-image.ts     # Delete image from storage
│   ├── login.ts            # User login
│   ├── logout.ts           # User logout
│   ├── me.ts               # Get current user
│   └── upload.ts           # Image upload to Supabase
├── prisma/                  # Database schema & migrations
│   ├── migrations/         # Migration files
│   └── schema.prisma       # Database schema
├── public/                  # Static files
│   ├── robots.txt          # SEO: Search engine rules
│   ├── sitemap.xml         # SEO: Site structure
│   └── site.webmanifest    # PWA manifest
├── src/
│   ├── assets/             # Images & static assets
│   ├── components/         # React components
│   │   ├── views/         # Page views
│   │   ├── Footer.tsx     # Footer component
│   │   ├── Logo.tsx       # Logo component
│   │   ├── Navbar.tsx     # Navigation
│   │   └── WhatsAppCTA.tsx # WhatsApp button
│   ├── utils/             # Utility functions
│   │   ├── customizationStore.ts  # Data management
│   │   ├── structuredData.ts      # SEO schemas
│   │   ├── translations.ts        # Multilingual text
│   │   └── useSEO.ts             # SEO hook
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   ├── types.ts           # TypeScript types
│   └── index.css          # Global styles
├── .env                    # Environment variables (NOT in git)
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite build config
├── vercel.json            # Vercel deployment config
├── server.ts              # Express server
├── README.md              # This file
├── VERCEL_ENV_SETUP.md    # Environment setup guide
├── PRODUCTION_DEPLOYMENT_GUIDE.md  # Full deployment guide
├── SUPABASE_STORAGE_SETUP.md       # Storage setup guide
└── FAVICON_SETUP.md       # Favicon creation guide
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview & quick start |
| `VERCEL_ENV_SETUP.md` | **Fix deployment errors** - Environment variables setup |
| `PRODUCTION_DEPLOYMENT_GUIDE.md` | Complete deployment guide with security checklist |
| `SUPABASE_STORAGE_SETUP.md` | Image storage configuration (Bengali) |
| `FAVICON_SETUP.md` | Favicon & app icon generation guide |
| `DATABASE_FIX.md` | Database troubleshooting |

---

## 🔐 Security Features

- ✅ JWT authentication with httpOnly cookies
- ✅ Role-based access control (RBAC)
- ✅ Password hashing (bcrypt)
- ✅ CORS protection
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection
- ✅ Environment variables for secrets
- ✅ Supabase Row Level Security (RLS)

---

## 🎨 Customization

### Update Brand Colors

Edit `src/index.css` and component files:

```css
/* Primary: Blue */
--color-primary: #3B82F6;

/* Success: Green */
--color-success: #10B981;

/* Adjust throughout the app */
```

### Update Business Information

Edit `src/utils/structuredData.ts`:
- Company name
- Phone number
- Email address
- Office address
- Social media links

### Add New Pages

1. Create component in `src/components/views/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Navbar.tsx`
4. Add SEO data in `src/utils/useSEO.ts`

---

## 📊 SEO Features

✅ **Meta Tags:** Title, description, keywords  
✅ **Open Graph:** Facebook, LinkedIn preview  
✅ **Twitter Cards:** Twitter preview  
✅ **Structured Data:** Organization, LocalBusiness, FAQ schemas  
✅ **Sitemap:** `/sitemap.xml`  
✅ **Robots:** `/robots.txt`  
✅ **Canonical URLs:** Duplicate content prevention  
✅ **Mobile Responsive:** Google mobile-first indexing  

---

## 🧪 Testing

### Local Testing

```bash
npm run dev
```

Test checklist:
- ✅ All pages load
- ✅ Navigation works
- ✅ Forms submit
- ✅ Admin login
- ✅ Image upload
- ✅ Language toggle

### Production Testing

After deployment, test:
- ✅ Custom domain works
- ✅ HTTPS enabled
- ✅ API routes working
- ✅ Database connected
- ✅ Image uploads to Supabase
- ✅ Contact form emails

---

## 📈 Performance

### Build Stats (Production)

```
dist/assets/index.css           55.87 kB │ gzip:  9.40 kB
dist/assets/vendor-react.js      3.63 kB │ gzip:  1.35 kB
dist/assets/AdminView.js        99.36 kB │ gzip: 12.23 kB
dist/assets/index.js           290.69 kB │ gzip: 90.37 kB
```

### Optimization Features

- ✅ **Lazy Loading:** Views loaded on demand
- ✅ **Code Splitting:** Vendor chunks separated
- ✅ **Minification:** Terser minification
- ✅ **CSS Splitting:** Per-route CSS
- ✅ **Tree Shaking:** Unused code removed
- ✅ **Image Optimization:** CDN delivery via Supabase

---

## 🔄 Updates & Maintenance

### Update Dependencies

```bash
npm update
```

### Database Migrations

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply to production
npx prisma migrate deploy
```

### Backup Database

```bash
# From Supabase Dashboard
Settings → Database → Backups
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 📞 Support

For deployment issues or questions:
1. Check documentation files (listed above)
2. Review error logs in Vercel Dashboard
3. Verify environment variables are set correctly

---

## 🎉 Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env with your credentials

# 3. Setup database
npx prisma migrate deploy
npx prisma generate

# 4. Run development server
npm run dev

# 5. Deploy to Vercel
vercel --prod
```

**🚀 Your website is now live!**

---

**Built with ❤️ for Premium Visa Consultancy**
