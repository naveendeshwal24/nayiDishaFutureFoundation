# Deployment Guide - Nai Disha Foundation

## Overview
This guide walks through deploying the Nai Disha Foundation website to Vercel with proper security practices.

---

## Part 1: Prepare Local Environment

### Step 1: Verify Build Success
```bash
npm run build
npm run preview
```

### Step 2: Verify .env.local is NOT committed
```bash
git status
# Confirm .env.local is NOT listed (should be ignored by .gitignore)
```

### Step 3: Update .env.example
✅ Already done - `.env.example` created with placeholders

---

## Part 2: Supabase Credential Rotation

### ⚠️ CRITICAL: Rotate Exposed Credentials

**Timeline**: Complete BEFORE Vercel deployment

### Step 2a: Generate New Supabase Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. **SAVE CURRENT VALUES** (for backup):
   - `Project URL`
   - `Anon Key`
   - `Service Role Key`

5. To rotate the Anon Key:
   - ⚠️ Note: Supabase doesn't have a traditional key rotation system
   - **Option 1**: Disable the current project and create a new one
   - **Option 2**: Regenerate the Anon Key (if available in your plan)
   - **Option 3**: Create a new Supabase project

### Step 2b: Update Local Environment

1. Update `.env.local` with NEW credentials:
   ```
   VITE_SUPABASE_URL=https://ynkalunthvomjjgcbcmj.supabase.co
   VITE_SUPABASE_ANON_KEY=<new_key_here>
   ```

2. Test locally:
   ```bash
   npm run dev
   # Test admin login, file uploads, etc.
   ```

3. ✅ Verify `.env.local` is NOT staged for commit:
   ```bash
   git status
   # .env.local should NOT appear in output
   ```

---

## Part 3: Vercel Deployment Setup

### Step 3a: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. **Import Git Repository**:
   - Select your GitHub account
   - Find `NayiDishaFoundation` repository
   - Click **Import**

4. **Configure Project**:
   - Framework Preset: **Other** (since it's a Vite SPA)
   - Build Command: `npm run build` ✅ (should auto-detect)
   - Output Directory: `dist` ✅ (should auto-detect)
   - Install Command: `npm install`

5. Click **"Deploy"**

### Step 3b: Set Environment Variables

1. After deployment (will fail first time - that's OK)
2. Go to **Project Settings** → **Environment Variables**
3. Add these variables for **all environments** (Production, Preview, Development):

   ```
   VITE_SUPABASE_URL = https://ynkalunthvomjjgcbcmj.supabase.co
   VITE_SUPABASE_ANON_KEY = <your_new_rotated_key>
   ```

4. Click **"Save"**

5. **Redeploy**: Go to **Deployments** → **Redeploy** (latest)

### Step 3c: Configure Custom Domain (Optional)

1. In **Project Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (usually 24 hours)

---

## Part 4: Security Headers Configuration

### Step 4a: Verify Security Headers (Vercel)

1. Vercel serves with HTTPS automatically ✅
2. Custom headers need to be configured via `vercel.json` (already created) ✅
3. However, Vercel static deployments have limitations on custom headers

### Step 4b: Set Security Headers via HTTP

For production Vercel deployments, security headers are typically handled by:
1. **Vercel Automatically**:
   - HTTPS enforcement
   - Secure cookie handling
   - DDoS protection

2. **Manual Headers** (for custom domain):
   - Add headers via `vercel.json` (if using Vercel Functions)
   - Or configure at CDN level (Cloudflare, Akamai, etc.)

### Step 4c: Verify Headers in Browser

1. Open DevTools (F12)
2. Go to **Network** tab
3. Reload page
4. Click on main document request
5. Check **Response Headers** for security headers

Expected headers (if configured):
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## Part 5: Post-Deployment Verification

### Step 5a: Test Functionality

1. Visit live URL: `https://your-domain.com`
2. Test public pages:
   - ✅ Home page loads
   - ✅ Gallery loads images
   - ✅ Videos play
   - ✅ Navigation works
   - ✅ Contact form works

3. Test admin area:
   - Navigate to `/admin/login`
   - Login with admin credentials
   - Upload test image/video
   - Verify upload appears in dashboard
   - Test delete functionality

### Step 5b: Verify Security

1. Check HTTPS:
   - ✅ URL shows 🔒 lock icon
   - ✅ No "Not Secure" warnings
   - ✅ Certificate valid

2. Check Security Headers:
   ```
   # Via curl
   curl -I https://your-domain.com | grep -i "x-"
   ```

3. Check Console for Errors:
   - ✅ No CORS errors
   - ✅ No failed resource loads
   - ✅ No security warnings

### Step 5c: Performance Check

1. Chrome DevTools → Lighthouse
2. Run Lighthouse audit
3. Check scores:
   - Performance > 70
   - Accessibility > 70
   - Best Practices > 70
   - SEO > 70

---

## Part 6: Request Google Safe Browsing Review

### Step 6a: Submit for Review

1. Go to [Google Search Console](https://search.google.com/search-console)
2. **Add Property** → Add your domain
3. Follow DNS verification steps
4. Wait for indexing

### Step 6b: Report Safe Browsing Issue

1. If still seeing "Site is dangerous":
   - Go to [Google Safe Browsing Help](https://safebrowsing.google.com/)
   - Click **"Report an issue"**
   - Select your domain
   - Confirm site is safe
   - Google will review within 24-48 hours

### Step 6c: Monitor

1. Google Search Console → **Security & Manual Actions**
2. Check for any warnings
3. Monitor for issues

---

## Part 7: Post-Deployment Maintenance

### Daily
- Monitor Vercel deployment logs for errors
- Check error tracking (if configured)

### Weekly
- Review Supabase logs for unauthorized access attempts
- Monitor upload activity in admin dashboard

### Monthly
- Run `npm audit` for dependency vulnerabilities
- Review admin user access logs
- Backup important data

### Quarterly
- Security audit of logs
- Review and update security policies
- Rotate API keys if necessary

---

## Troubleshooting

### Issue: "Build failed" on Vercel

**Solution**:
1. Check Vercel logs: **Deployments** → **Logs**
2. Verify environment variables are set
3. Run locally: `npm run build` should succeed
4. Check for TypeScript errors: `npm run lint`

### Issue: Admin login not working

**Solution**:
1. Verify Supabase credentials in Vercel environment variables
2. Check browser console for CORS errors
3. Verify Supabase project is running
4. Check admin user exists in Supabase Auth

### Issue: Images/videos not loading

**Solution**:
1. Check Supabase Storage buckets exist
2. Verify bucket permissions allow public read
3. Check browser console for 403/404 errors
4. Verify VITE_SUPABASE_URL is correct

### Issue: "Site is dangerous" still showing

**Solution**:
1. Wait 24-48 hours after Google review request
2. Clear browser cache: Ctrl+Shift+Delete
3. Try in Incognito mode
4. Check with [Safe Browsing Status Tool](https://transparencyreport.google.com/safe-browsing)

---

## Rollback Instructions

### If Something Goes Wrong

1. **Vercel Rollback**:
   - Go to **Deployments**
   - Select previous successful deployment
   - Click **"Redeploy"**
   - Wait for deployment to complete

2. **Revert Code Changes**:
   ```bash
   git log --oneline
   git checkout <previous_commit>
   git push origin master -f  # Force push (use carefully!)
   ```

3. **Verify Service**:
   - Test all functionality
   - Check logs for errors

---

## Quick Command Reference

```bash
# Local development
npm install          # Install dependencies
npm run dev          # Start dev server
npm run lint         # Check code quality
npm run build        # Build for production
npm run preview      # Preview production build

# Git operations
git status           # Check status
git add .            # Stage changes
git commit -m "..."  # Commit with message
git push             # Push to GitHub

# Dependency management
npm audit            # Check for vulnerabilities
npm update           # Update packages
npm outdated         # Check for outdated packages
```

---

## Security Reminders

⚠️ **NEVER**:
- Commit `.env.local` to Git
- Share VITE_SUPABASE_ANON_KEY in public
- Use same password for multiple services
- Leave admin accounts unused/forgotten

✅ **ALWAYS**:
- Use HTTPS in production
- Keep dependencies updated
- Monitor logs regularly
- Use strong passwords for admin accounts
- Review access logs monthly

---

## Support & Documentation

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **React Router Docs**: https://reactrouter.com/
- **Vite Docs**: https://vite.dev/

---

**Last Updated**: December 2024  
**Status**: Ready for Deployment
