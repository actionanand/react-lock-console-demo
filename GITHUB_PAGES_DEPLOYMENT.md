# GitHub Pages Deployment Guide

## Overview

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch using the `peaceiris/actions-gh-pages` action.

## 🚀 Initial Setup

### 1. Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, you should see:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **(root)**
   
   ⚠️ **Note**: The workflow will automatically create the `gh-pages` branch on first deployment. If it doesn't appear initially, wait for the first workflow run to complete.

### 2. Add Required Secret

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add:
   - **Name**: `PASSWORD_HASH`
   - **Value**: Your SHA1 password hash
   - Example: `f865b53623b121fd34ee5426c792e5c33af8c227` (for password "admin123")

### 3. Base Path Configuration

The workflow is configured for: `/react-lock-console-demo/`

✅ This is already set in `.github/workflows/react_github_pages.yml`:

```yaml
env:
  VITE_BASE_PATH: /react-lock-console-demo/
```

If your repository name is different, update this value to match your repo name.

## 📦 Deployment Process

### Automatic Deployment

Every push to `main` branch will:
1. Checkout your code
2. Install dependencies with `npm ci`
3. Build your application with environment variables (`VITE_PASSWORD_HASH` and `VITE_BASE_PATH`)
4. Deploy to `gh-pages` branch automatically using `peaceiris/actions-gh-pages`
5. Your site will be available at: `https://actionanand.github.io/react-lock-console-demo/`

### Workflow Details

The workflow uses a single job that:
- Builds the React app with Vite
- Deploys the `dist/` folder to the `gh-pages` branch
- Uses `enable_jekyll: false` to prevent Jekyll processing

## 🔧 How It Works

### Build Configuration

The Vite config (`vite.config.js`) uses the `base` option to set the correct base path:

```javascript
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  // ...
})
```

### Workflow Steps

The workflow (`.github/workflows/react_github_pages.yml`):

1. **Checkout**: Gets your code
2. **Setup Node.js**: Installs Node.js 22.16.0
3. **Install dependencies**: Runs `npm ci` for clean install
4. **Build**: Creates production build with environment variables
5. **Deploy**: Publishes `dist/` folder to `gh-pages` branch

### Important Files

- `.github/workflows/react_github_pages.yml` - GitHub Actions workflow
- `vite.config.js` - Vite configuration with base path support
- `public/.nojekyll` - Prevents Jekyll processing (copied to dist automatically)

## 🌐 Accessing Your Site

After successful deployment:
- **Production URL**: `https://actionanand.github.io/react-lock-console-demo/`
- **Build status**: Check the Actions tab for deployment status

## 🧪 Testing Locally with Base Path

To test the production build locally:

```bash
# Build with production base path
VITE_BASE_PATH=/react-lock-console-demo/ npm run build

# Preview the build
npm run preview
```

Then access: `http://localhost:4173/react-lock-console-demo/`

## 📝 About `npm ci` vs `npm install`

**Why `npm ci` in the workflow?**

- `npm ci` - Clean install from `package-lock.json` (used in CI/CD)
  - Faster and more reliable
  - Requires `package-lock.json` to exist
  - Deletes `node_modules` and reinstalls from scratch
  - Perfect for automated builds

- `npm install` - Regular install (used for local development)
  - Updates `package-lock.json` if needed
  - Can modify dependencies

**Note**: `npm ci` is a CLI command, not a script in `package.json`

## ⚠️ Troubleshooting

### "Get Pages site failed" Error

This error occurs when using the official `actions/deploy-pages` action without proper GitHub Pages configuration. 

**Solution**: We now use `peaceiris/actions-gh-pages@v3` which:
- ✅ Automatically creates and manages the `gh-pages` branch
- ✅ Doesn't require GitHub Pages to be pre-configured for "GitHub Actions"
- ✅ Works with the traditional "Deploy from a branch" setting

### Deployment fails

**Check these:**
1. ✅ `PASSWORD_HASH` secret is configured in Settings → Secrets
2. ✅ Workflow has `contents: write` permission (already configured)
3. ✅ The `main` branch exists and you're pushing to it
4. ✅ Check the Actions tab for detailed error logs

### Site shows 404 or assets not loading

**Solutions:**
1. Verify GitHub Pages is using `gh-pages` branch in Settings → Pages
2. Check the base path matches your repo name: `/react-lock-console-demo/`
3. Wait a few minutes after first deployment for GitHub Pages to activate
4. Clear browser cache and try again

### Images or assets not loading

If you have images/assets, use relative paths or the base URL:

```jsx
// ✅ Good - relative path
<img src="/logo.png" alt="Logo" />

// ✅ Good - using import
import logo from './assets/logo.png'
<img src={logo} alt="Logo" />
```

Vite will automatically handle the base path.

## 🔄 Updating Deployment

To update your deployed site:
1. Make changes to your code
2. Commit and push to `main` branch
3. GitHub Actions will automatically rebuild and deploy

## 🔐 Security Notes

- The `PASSWORD_HASH` secret is injected at build time
- The hash becomes part of the bundled JavaScript
- Remember: Client-side password protection is not secure
- For production apps, use proper backend authentication

## 📚 Additional Resources

- [Vite Deployment Docs](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
