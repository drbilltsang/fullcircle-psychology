# Vercel Deployment Configuration

## Step 1: Import Project to Vercel

1. **In Vercel Dashboard:**
   - Click "Import Project"
   - Connect to your Replit project or GitHub repo
   - Select "fullcircle-psychology" project

## Step 2: Build Configuration

**Framework Preset:** Vite
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`
**Root Directory:** `.` (leave default)

## Step 3: Environment Variables

Add these in Vercel Project Settings → Environment Variables:

```
DATABASE_URL=postgresql://neondb_owner:npg_u6xM0GynEiza@ep-raspy-forest-a6st6dm2.us-west-2.aws.neon.tech/neondb?sslmode=require

STRIPE_SECRET_KEY=EogZ3l8yWHPiJAh5B4aIqQc0qX5cPgAGMELdL8fwqx5b5xkMGpP24Wc5haFxsMO0600Ay42KYQi

VITE_STRIPE_PUBLIC_KEY=pk_live_51MRQK7EOTWDhypxM89386shO0KNpNXKxFJHPrJBCCURh7tnwpINDppvLJQeeyZgogFEorpr5yHecOiwELtpzwqdX00w8APWbyV

SESSION_SECRET=8K2mN9pQ7xR4vW6yZ3cF5gH8jL1nP4sT
```

## Step 4: Custom Domain Setup

**In Vercel Project Settings → Domains:**
- Add: `fullcirclepsychology.org`
- Add: `www.fullcirclepsychology.org`

## Step 5: DNS Records for Namecheap

**Replace existing A records with:**
```
Type: A Record
Host: @
Value: 76.76.19.61
TTL: Automatic

Type: CNAME Record  
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

## Step 6: Deploy and Test

1. Deploy the project in Vercel
2. Wait for DNS propagation (5-30 minutes)
3. Test website at fullcirclepsychology.org
4. Test email at info@fullcirclepsychology.org

Your professional psychology practice website will be live!