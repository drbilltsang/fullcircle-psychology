# Email & Hosting Setup Guide for fullcirclepsychology.org

## Step 1: Google Workspace Email Setup

### 1.1 Sign up for Google Workspace
1. Go to workspace.google.com
2. Choose "Get started" 
3. Enter your domain: fullcirclepsychology.org
4. Select "Business Starter" plan ($6/user/month)
5. Create your admin account (recommend: admin@fullcirclepsychology.org)

### 1.2 DNS Records to Add in Namecheap
Log into your Namecheap account → Domain List → Manage → Advanced DNS

**MX Records (Mail Exchange):**
```
Type: MX Record
Host: @
Value: ASPMX.L.GOOGLE.COM
Priority: 1

Type: MX Record  
Host: @
Value: ALT1.ASPMX.L.GOOGLE.COM
Priority: 5

Type: MX Record
Host: @
Value: ALT2.ASPMX.L.GOOGLE.COM
Priority: 5

Type: MX Record
Host: @
Value: ALT3.ASPMX.L.GOOGLE.COM
Priority: 10

Type: MX Record
Host: @
Value: ALT4.ASPMX.L.GOOGLE.COM
Priority: 10
```

**TXT Record for Domain Verification:**
```
Type: TXT Record
Host: @
Value: google-site-verification=[CODE_FROM_GOOGLE]
TTL: Automatic
```

**SPF Record for Email Security:**
```
Type: TXT Record
Host: @
Value: v=spf1 include:_spf.google.com ~all
TTL: Automatic
```

**DKIM Record (Google will provide this):**
```
Type: TXT Record
Host: google._domainkey
Value: [DKIM_KEY_FROM_GOOGLE]
TTL: Automatic
```

### 1.3 Recommended Email Addresses to Create
- info@fullcirclepsychology.org (main contact)
- appointments@fullcirclepsychology.org (booking inquiries)
- billing@fullcirclepsychology.org (payment/insurance)
- privacy@fullcirclepsychology.org (HIPAA compliance officer)
- support@fullcirclepsychology.org (technical issues)

## Step 2: Vercel Hosting Setup

### 2.1 Deploy to Vercel
1. Sign up at vercel.com with GitHub
2. Import your Replit project to GitHub first
3. Connect GitHub repo to Vercel
4. Deploy with these settings:

**Build Settings:**
```
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Environment Variables:**
```
DATABASE_URL=[your_database_url]
STRIPE_SECRET_KEY=[your_stripe_key]
VITE_STRIPE_PUBLIC_KEY=[your_stripe_public_key]
SESSION_SECRET=[generate_random_string]
```

### 2.2 Custom Domain Setup in Vercel
1. Go to Project Settings → Domains
2. Add fullcirclepsychology.org
3. Add www.fullcirclepsychology.org
4. Vercel will provide DNS records

**DNS Records to Add in Namecheap:**
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

## Step 3: SSL Certificate & Security
- Vercel automatically provides SSL certificates
- Force HTTPS redirects are enabled by default
- Update all website references to use HTTPS

## Step 4: Update Website Contact Information

Replace all placeholder contact info with:
- Email: info@fullcirclepsychology.org
- Phone: (Your actual phone number)
- Address: (Your actual business address)

## Step 5: Database Migration (if needed)
If moving from Replit database:
1. Export current data
2. Set up production database (Neon, PlanetScale, or Supabase)
3. Update DATABASE_URL environment variable

## Cost Breakdown:
- Domain (Namecheap): ~$12/year
- Google Workspace: $6/month
- Vercel: Free tier (sufficient for most practices)
- **Total: ~$6/month + $12/year**

## Timeline:
- DNS changes: 24-48 hours to propagate
- Email setup: Immediate after DNS propagation
- Website deployment: 5-10 minutes

## Next Steps:
1. Complete Google Workspace signup
2. Add DNS records in Namecheap
3. Deploy to Vercel
4. Test email functionality
5. Update website content with real contact information