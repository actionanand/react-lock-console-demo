# Environment Variables Setup

## Overview

This project uses environment variables to configure sensitive data like password hashes. This guide explains how to set up environment variables for local development and GitHub Actions.

## Vite Environment Variables

Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client-side code.

- **Access in code**: `import.meta.env.VITE_VARIABLE_NAME`
- **NOT**: `process.env.REACT_APP_VARIABLE_NAME` (this is for Create React App)

## Local Development

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and update the values:
   ```env
   VITE_PASSWORD_HASH=your_password_hash_here
   ```

3. Generate a password hash:
   - Visit: https://emn178.github.io/online-tools/sha1.html
   - Enter your password
   - Copy the SHA1 hash
   - Paste it in your `.env` file

4. The `.env` file is git-ignored and will not be committed.

## GitHub Actions / CI/CD

### Setting up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name**: `PASSWORD_HASH`
   - **Value**: Your SHA1 password hash (e.g., `f865b53623b121fd34ee5426c792e5c33af8c227`)

### How it works

The GitHub Actions workflow (`.github/workflows/build.yml`) will:
1. Build your application
2. Inject the secret as an environment variable during build time
3. The secret becomes `VITE_PASSWORD_HASH` in your code

```yaml
- name: Build application
  env:
    VITE_PASSWORD_HASH: ${{ secrets.PASSWORD_HASH }}
  run: npm run build
```

### For other CI/CD platforms

**Vercel:**
```bash
# In Vercel dashboard, add environment variable:
VITE_PASSWORD_HASH=your_hash_here
```

**Netlify:**
```bash
# In Netlify dashboard → Site settings → Environment variables:
VITE_PASSWORD_HASH=your_hash_here
```

**Other platforms:**
- Add `VITE_PASSWORD_HASH` as an environment variable in your deployment settings
- The value should be the SHA1 hash of your password

## Important Notes

⚠️ **Security Considerations:**

1. **Never commit `.env` files** - They contain sensitive data
2. **Always use `.env.example`** - For documenting required variables
3. **Client-side exposure** - Remember that `VITE_` prefixed variables are exposed to the browser
4. **SHA1 hashing** - For better security, consider using backend authentication instead of client-side password checks

## Fallback Value

If no environment variable is set, the application will use the default fallback hash:
- Hash: `f865b53623b121fd34ee5426c792e5c33af8c227`
- Password: `admin123`

## Testing

Test your environment variable setup:

```bash
# Local development
npm run dev

# Build (simulating production)
npm run build
npm run preview
```

## Troubleshooting

**Problem**: Environment variable not working
- ✅ Make sure variable starts with `VITE_`
- ✅ Restart dev server after changing `.env`
- ✅ Check you're using `import.meta.env`, not `process.env`

**Problem**: GitHub Actions build fails
- ✅ Verify secret name matches exactly: `PASSWORD_HASH`
- ✅ Check the workflow file maps it correctly to `VITE_PASSWORD_HASH`
- ✅ Ensure the secret is set in the repository settings
