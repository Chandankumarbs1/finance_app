# Railway Deployment Guide

This guide explains how to deploy your Personal Finance App to **Railway** as an alternative to Render.

## Prerequisites
1. **GitHub Account**: Your code should be pushed to GitHub
2. **Railway Account**: Sign up at [railway.app](https://railway.app) (can use GitHub login)
3. **Credit Card**: Required for verification (you won't be charged on free tier)

## Step 1: Create a Railway Account
1. Go to [railway.app](https://railway.app)
2. Click **Login** and sign in with GitHub
3. Verify your account with a credit card (for free tier access)

## Step 2: Create a New Project
1. Click **New Project** on Railway dashboard
2. Select **Deploy from GitHub repo**
3. Choose your `finance_app` repository
4. Railway will create a project

## Step 3: Deploy PostgreSQL Database
1. In your project, click **New**
2. Select **Database** → **PostgreSQL**
3. Railway will automatically provision a PostgreSQL database
4. Click on the PostgreSQL service
5. Go to the **Variables** tab
6. Copy these values (you'll need them):
   - `DATABASE_URL` (or construct from individual variables)

## Step 4: Deploy Backend
1. In your project, click **New** → **GitHub Repo**
2. Select your repository again
3. Railway will detect the Dockerfile
4. **Configure Settings**:
   - Click on the service
   - Go to **Settings** tab
   - **Root Directory**: Leave empty (Dockerfile is in root)
   - **Start Command**: (Auto-detected from Dockerfile)
5. **Add Environment Variables**:
   - Go to **Variables** tab
   - Click **Raw Editor** and paste:
   ```
   PORT=8080
   SPRING_DATASOURCE_URL=jdbc:postgresql://[HOST]:[PORT]/[DATABASE]
   SPRING_DATASOURCE_USERNAME=[USERNAME]
   SPRING_DATASOURCE_PASSWORD=[PASSWORD]
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   ```
   - Replace the values with your PostgreSQL credentials from Step 3
   - **Tip**: Railway provides a `DATABASE_URL` variable - you can reference it:
     - `SPRING_DATASOURCE_URL=${{Postgres.DATABASE_URL}}`
     - But change `postgresql://` to `jdbc:postgresql://`
6. **Generate Domain**:
   - Go to **Settings** tab
   - Scroll to **Networking**
   - Click **Generate Domain**
   - Copy the URL (e.g., `https://finance-backend-production.up.railway.app`)

## Step 5: Deploy Frontend
1. In your project, click **New** → **GitHub Repo**
2. Select your repository again (yes, same repo)
3. **Configure Settings**:
   - Click on the service
   - Go to **Settings** tab
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: Leave empty (static site)
4. **Add Environment Variables**:
   - Go to **Variables** tab
   - Add:
     - `VITE_API_URL`: `https://YOUR-BACKEND-URL.up.railway.app/api`
     - (Use the backend URL from Step 4)
5. **Configure Static Site**:
   - Still in **Settings**
   - Scroll to **Deploy**
   - Set **Watch Paths**: `frontend/**`
   - This ensures frontend only rebuilds when frontend code changes
6. **Generate Domain**:
   - Go to **Settings** → **Networking**
   - Click **Generate Domain**
   - This is your app URL!

## Step 6: Access Your App
1. Open the frontend domain URL
2. Register a new account
3. Start using your finance tracker!

## Important Notes

### Free Tier Limits
- **$5 credit per month** (resets monthly)
- **500 hours of usage** (enough for 1-2 small apps)
- **1 GB RAM** per service
- **Database**: 1 GB storage

### Cost Monitoring
- Check your usage in Railway dashboard
- Set up usage alerts in **Account Settings**
- Free tier is usually enough for personal projects

### Advantages over Render
- ✅ Faster deployments
- ✅ Better developer experience
- ✅ Automatic HTTPS
- ✅ Easy environment variable management
- ✅ Can reference variables between services (e.g., `${{Postgres.DATABASE_URL}}`)

### Troubleshooting

**Backend fails to connect to database:**
- Verify `SPRING_DATASOURCE_URL` is in JDBC format
- Check that all database credentials are correct
- Use Railway's variable references: `${{Postgres.DATABASE_URL}}`

**Frontend can't reach backend:**
- Ensure `VITE_API_URL` includes `/api` at the end
- Verify backend domain is generated and service is running
- Check CORS is enabled (already configured in your code)

**Build fails:**
- Check build logs in Railway dashboard
- Ensure Dockerfile is in repository root
- Verify all dependencies are in `pom.xml` and `package.json`

## Comparison: Railway vs Render

| Feature | Railway | Render |
|---------|---------|--------|
| Free Tier | $5/month credit | Limited free services |
| Setup Difficulty | Very Easy | Easy |
| Build Speed | Fast | Moderate |
| Database | Included | Separate service |
| Custom Domains | Yes (paid) | Yes (free) |
| Best For | Quick deploys | Production apps |

Both are excellent choices for your finance app!
