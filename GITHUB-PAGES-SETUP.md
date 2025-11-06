# 🚀 Setup Instructions for GitHub Pages Demo

## ✅ Files Created

I've set up everything you need to deploy your demo to GitHub Pages:

### 1. GitHub Actions Workflow
- `.github/workflows/deploy-demo.yml` - Automatic deployment on push to master

### 2. Angular Configuration  
- Added `github-pages` build configuration in `angular.json`
- Configured proper `baseHref` for GitHub Pages

### 3. Enhanced Demo Metadata
- Updated `index.html` with SEO-friendly meta tags
- Added Open Graph and Twitter card support

### 4. NPM Scripts
- `npm run build-demo` - Build for GitHub Pages
- `npm run build-demo-local` - Build for local testing

## 🔧 Manual Setup Steps (One-time)

### Step 1: Enable GitHub Pages
1. Go to your GitHub repository: `https://github.com/strikerh/ngx-side-page`
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### Step 2: Push Changes
```bash
git add .
git commit -m "feat: add GitHub Pages deployment for demo"
git push origin master
```

### Step 3: Monitor Deployment
1. Go to **Actions** tab in your repository
2. Watch the "Deploy Demo to GitHub Pages" workflow
3. Once complete, your demo will be live at: `https://strikerh.github.io/ngx-side-page/`

## 🎯 Expected Results

After successful deployment:

### 📍 Demo URL
`https://strikerh.github.io/ngx-side-page/`

### 🔄 Automatic Updates
- Demo updates automatically when you push to `master`
- Build takes ~2-3 minutes
- No manual intervention needed

### 📊 Features Included
- ✅ SEO optimized meta tags
- ✅ Social media preview cards
- ✅ Responsive design
- ✅ Interactive demo functionality
- ✅ Professional presentation

## 🐛 Troubleshooting

### If Build Fails
1. Check **Actions** tab for error details
2. Ensure all dependencies are in `package.json`
3. Verify Angular build succeeds locally: `npm run build-demo`

### If Page Doesn't Load
1. Check that GitHub Pages is enabled in repository settings
2. Verify the workflow completed successfully
3. Check browser console for any path issues

### If Styling Looks Wrong
- The `baseHref` is set to `/ngx-side-page/` for GitHub Pages
- This is different from local development (`/`)
- If you see broken styles, it's likely a path issue

## 🚀 Next Steps

Once live, you can:

1. **Share the demo** in your README, NPM page, social media
2. **Monitor usage** with Google Analytics (optional)
3. **Gather feedback** from users testing the live demo
4. **Iterate improvements** based on user interactions

The demo will significantly boost your library's adoption by letting users try before they install!

---

**Status**: ✅ Ready to deploy! Just follow the manual setup steps above.