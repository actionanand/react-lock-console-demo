# GitHub Pages Deployment Guide

## Overview

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

## 🚀 Initial Setup

### 1. Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - Source: **GitHub Actions** (not "Deploy from a branch")
4. Save the changes

### 2. Add Required Secret

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add:
   - **Name**: `PASSWORD_HASH`
   - **Value**: Your SHA1 password hash
   - Example: `f865b53623b121fd34ee5426c792e5c33af8c227` (for password "admin123")

### 3. Update Base Path (if needed)

The workflow is configured for the repository path: `/react-lock-console-demo/`

If your repository name is different, update the base path in `.github/workflows/build.yml`:

```yaml
- name: Build application
  env:
    VITE_PASSWORD_HASH: ${{ secrets.PASSWORD_HASH }}
    VITE_BASE_PATH: /YOUR-REPO-NAME/  # ← Change this
  run: npm run build
```

## 📦 Deployment Process

### Automatic Deployment

Every push to `main` branch will:
1. Build your application with environment variables
2. Deploy to GitHub Pages automatically
3. Your site will be available at: `https://actionanand.github.io/react-lock-console-demo/`

### Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab
2. Select **Build and Deploy to GitHub Pages**
3. Click **Run workflow**
4. Select `main` branch and run

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

1. **Build Job**:
   - Checks out code
   - Installs dependencies with `npm ci`
   - Builds with `VITE_PASSWORD_HASH` and `VITE_BASE_PATH`
   - Uploads build artifacts

2. **Deploy Job** (only on main branch):
   - Downloads build artifacts
   - Configures GitHub Pages
   - Uploads to Pages
   - Deploys

### Important Files

- `.github/workflows/build.yml` - GitHub Actions workflow
- `vite.config.js` - Vite configuration with base path
- `public/.nojekyll` - Prevents Jekyll processing on GitHub Pages

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

### Deployment fails

**Check these:**
1. ✅ GitHub Pages is enabled in Settings → Pages
2. ✅ Source is set to "GitHub Actions"
3. ✅ `PASSWORD_HASH` secret is configured
4. ✅ Workflow has required permissions (already configured)

### Site shows 404 or assets not loading

**Solutions:**
1. Verify the base path in workflow matches your repo name
2. Check browser console for asset loading errors
3. Ensure `public/.nojekyll` file exists

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
