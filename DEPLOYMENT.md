# CalcHub Deployment Guide

## Quick Deploy Options

### Option 1: Netlify (Recommended for Beginners)

#### One-Click Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

#### Manual Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site (first time only)
netlify init

# Deploy
netlify deploy --prod
```

#### Deploy via Netlify Dashboard
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Click "Deploy site" (no build settings needed!)
5. Your site will be live at: `https://your-site-name.netlify.app`

### Option 2: Vercel

#### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Manual Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

### Option 3: GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Source: Select your branch (main/master)
4. Folder: / (root)
5. Click Save
6. Your site will be available at: `https://username.github.io/repository-name`

**Note:** For GitHub Pages, if your repository is not in the root, update all paths:
- Change `href="/css/style.css"` to `href="./css/style.css"`
- Change all absolute paths to relative paths

### Option 4: Cloudflare Pages

1. Go to https://pages.cloudflare.com
2. Click "Create a project"
3. Connect your Git repository
4. Build settings: Leave empty (static site)
5. Click "Save and Deploy"

### Option 5: AWS S3 + CloudFront

```bash
# Install AWS CLI
# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Enable static website hosting
aws s3 website s3://your-bucket-name --index-document index.html

# Upload files
aws s3 sync . s3://your-bucket-name --exclude ".git/*"

# Make files public
aws s3api put-bucket-policy --bucket your-bucket-name --policy file://bucket-policy.json
```

### Option 6: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

## Local Development Server

### Python
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Node.js
```bash
# Using http-server
npx http-server -p 8000

# Using live-server (with auto-reload)
npx live-server --port=8000
```

### PHP
```bash
php -S localhost:8000
```

### VS Code
Install "Live Server" extension and click "Go Live"

## Environment Configuration

### Production Checklist
- ✅ All paths are correct (relative or absolute)
- ✅ No console.log statements in production
- ✅ All images optimized
- ✅ Meta tags for SEO added
- ✅ Favicon added
- ✅ Analytics added (if needed)
- ✅ HTTPS enabled
- ✅ Custom domain configured (optional)

### Performance Optimization
1. Minify CSS and JavaScript (optional)
2. Compress images
3. Enable gzip compression
4. Set proper cache headers (already configured in netlify.toml and vercel.json)
5. Use CDN for external resources

### Custom Domain Setup

#### Netlify
1. Go to Site Settings → Domain management
2. Add custom domain
3. Update your DNS records with provided values

#### Vercel
1. Go to Project Settings → Domains
2. Add domain
3. Configure DNS with provided records

#### GitHub Pages
1. Add CNAME file with your domain
2. Configure DNS A records:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

## Security Headers

Already configured in `netlify.toml` and `vercel.json`:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## Monitoring & Analytics

### Add Google Analytics
Add this to `<head>` in index.html and all calculator pages:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## Troubleshooting

### Calculators not loading
- Check browser console for errors
- Verify all file paths are correct
- Ensure JavaScript files are loaded

### Styles not applying
- Clear browser cache
- Check CSS file paths
- Verify CSS files are accessible

### 404 Errors
- Check deployment configuration
- Verify redirect rules are set up
- Ensure all files are uploaded

## Support

For deployment issues:
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
- GitHub Pages: https://docs.github.com/pages

---

Need help? Open an issue on GitHub!
