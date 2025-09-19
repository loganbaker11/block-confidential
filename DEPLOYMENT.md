# Deployment Guide

## Vercel Deployment Instructions

### Prerequisites
- GitHub account with repository access
- Vercel account (free tier available)
- Node.js 18+ for local testing

### Step 1: Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `loganbaker11/block-confidential`
   - Click "Import"

### Step 2: Configure Build Settings

**Framework Preset:** Vite (auto-detected)
**Root Directory:** `./` (default)
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### Step 3: Environment Variables

Add the following environment variables in Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_KEY
VITE_RPC_URL_ALT=https://1rpc.io/sepolia
```

**Important:** Replace `YOUR_INFURA_KEY` and `YOUR_PROJECT_ID` with your actual values.

### Step 4: Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for build completion (2-3 minutes)
   - Note the deployment URL

2. **Verify Deployment**
   - Visit the provided URL
   - Test wallet connection
   - Verify all features work

### Step 5: Custom Domain (Optional)

1. **Add Domain**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Vercel automatically provides SSL
   - No additional configuration needed

## Manual Deployment

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are installed
   - Verify Node.js version compatibility

2. **Environment Variables**
   - Double-check variable names (case-sensitive)
   - Ensure variables are set for correct environment
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID
   - Check RPC URL configuration
   - Test on different networks

### Performance Optimization

1. **Enable Analytics**
   - Go to Project Settings > Analytics
   - Enable Web Analytics

2. **Configure Caching**
   - Vercel handles static asset caching
   - Consider service workers for advanced caching

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Vercel automatically provides HTTPS
   - Ensure all external resources use HTTPS

## Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Wallet connection works properly
- [ ] All environment variables are set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate is active
- [ ] Performance is acceptable
- [ ] All features are functional

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Wagmi Documentation](https://wagmi.sh/)

## Next Steps

1. **Test thoroughly** on deployed environment
2. **Set up monitoring** and alerts
3. **Configure CI/CD** for automated deployments
4. **Implement analytics** for user behavior tracking
5. **Set up error tracking** (e.g., Sentry)

---

**Note:** This deployment guide assumes you have the necessary permissions and access to both GitHub and Vercel accounts.