# Deploying Demo to GitHub Pages

This guide shows how to deploy the ngx-side-page demo to GitHub Pages for a live online demo.

## Method 1: GitHub Pages with GitHub Actions (Recommended)

### Step 1: Create GitHub Actions Workflow

Create `.github/workflows/deploy-demo.yml`:

```yaml
name: Deploy Demo to GitHub Pages

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build library
      run: npx ng build ngx-side-page
      
    - name: Build demo
      run: npx ng build ngx-side-page-demo --configuration production --base-href /ngx-side-page/
      
    - name: Setup Pages
      uses: actions/configure-pages@v4
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: ./dist/ngx-side-page-demo
        
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

### Step 2: Configure Repository Settings

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"

### Step 3: Update Angular Configuration

Update `angular.json` to support GitHub Pages deployment:

```json
{
  "projects": {
    "ngx-side-page-demo": {
      "architect": {
        "build": {
          "configurations": {
            "github-pages": {
              "outputPath": "dist/ngx-side-page-demo",
              "baseHref": "/ngx-side-page/",
              "deployUrl": "/ngx-side-page/"
            }
          }
        }
      }
    }
  }
}
```

## Method 2: Manual Deployment with gh-pages

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Add Deploy Script

Add to `package.json`:

```json
{
  "scripts": {
    "build-demo": "ng build ngx-side-page && ng build ngx-side-page-demo --configuration production --base-href /ngx-side-page/",
    "deploy-demo": "npm run build-demo && npx gh-pages -d dist/ngx-side-page-demo"
  }
}
```

### Step 3: Deploy

```bash
npm run deploy-demo
```

## Expected Demo URL

After deployment, your demo will be available at:
`https://strikerh.github.io/ngx-side-page/`

## Additional Enhancements

### Add Demo Metadata

Create `projects/ngx-side-page-demo/src/index.html` with proper meta tags:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>ngx-side-page Demo - Angular Side Panel Library</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Interactive demo of ngx-side-page - A versatile Angular library for creating slide-out side panels">
  <meta name="keywords" content="angular, side panel, drawer, slide-out, library, component">
  <meta property="og:title" content="ngx-side-page Demo">
  <meta property="og:description" content="Interactive demo showcasing the ngx-side-page Angular library">
  <meta property="og:url" content="https://strikerh.github.io/ngx-side-page/">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

### Add Analytics (Optional)

Add Google Analytics to track demo usage:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Benefits

1. **Live Demo**: Users can test the library before installing
2. **Documentation**: Shows real usage examples
3. **SEO**: Improves library discoverability
4. **Automatic Updates**: Demo updates automatically with each push
5. **Free Hosting**: GitHub Pages is free for public repositories

## Update README

Add demo link to your README files:

```markdown
## 🚀 Live Demo

Try the interactive demo: [https://strikerh.github.io/ngx-side-page/](https://strikerh.github.io/ngx-side-page/)
```