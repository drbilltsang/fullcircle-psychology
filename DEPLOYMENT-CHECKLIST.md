# Full Circle Psychology - Production Deployment Checklist

## ✅ Website Features Complete
- [x] Home page with all sections
- [x] About page with team information
- [x] Contact page with office details
- [x] Book Appointment system
- [x] Patient Portal with billing/payments
- [x] Provider Portal for staff
- [x] Privacy Policy (HIPAA compliant)
- [x] Terms of Service
- [x] Cookie consent banner
- [x] Mobile responsive design
- [x] Accessibility features
- [x] Stripe payment integration

## 📧 Email Setup Steps

### 1. Google Workspace ($6/month)
- Sign up at workspace.google.com
- Choose Business Starter plan
- Use domain: fullcirclepsychology.org

### 2. DNS Records (Add in Namecheap)
**MX Records:**
```
ASPMX.L.GOOGLE.COM (Priority 1)
ALT1.ASPMX.L.GOOGLE.COM (Priority 5)
ALT2.ASPMX.L.GOOGLE.COM (Priority 5)
ALT3.ASPMX.L.GOOGLE.COM (Priority 10)
ALT4.ASPMX.L.GOOGLE.COM (Priority 10)
```

**TXT Records:**
```
SPF: v=spf1 include:_spf.google.com ~all
Domain verification: [Google provides code]
DKIM: [Google provides key]
```

### 3. Create Email Addresses
- info@fullcirclepsychology.org
- appointments@fullcirclepsychology.org
- billing@fullcirclepsychology.org
- privacy@fullcirclepsychology.org

## 🚀 Hosting Migration to Vercel

### 1. GitHub Setup
- Export project from Replit to GitHub
- Connect GitHub to Vercel account

### 2. Vercel Configuration
- Framework: Vite
- Build: npm run build
- Output: dist

### 3. Environment Variables
- DATABASE_URL
- STRIPE_SECRET_KEY
- VITE_STRIPE_PUBLIC_KEY
- SESSION_SECRET

### 4. Custom Domain DNS
**Add to Namecheap:**
```
A Record: @ → 76.76.19.61
CNAME: www → cname.vercel-dns.com
```

## 💰 Cost Summary
- Domain renewal: ~$12/year
- Google Workspace: $6/month
- Vercel hosting: Free
- **Total: $6/month + $12/year**

## 🔧 Final Updates Needed
- [ ] Replace phone number with actual number
- [ ] Replace address with actual office address
- [ ] Update Google My Business listing
- [ ] Set up Google Analytics (optional)
- [ ] Test all email addresses
- [ ] Test payment processing

## 📋 Go-Live Timeline
1. **Day 1**: Set up Google Workspace, add DNS records
2. **Day 2-3**: DNS propagation (24-48 hours)
3. **Day 3**: Deploy to Vercel, configure domain
4. **Day 4**: Test all functionality, update contact info
5. **Day 5**: Go live!

Would you like me to help you with any specific step of this process?