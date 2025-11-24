# Deployment Guide for Personal Finance App

This guide explains how to deploy your application to **Render** (a cloud provider with a free tier) so you can access it from anywhere, including your phone, without your computer being on.

## Prerequisites
1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).

## Step 1: Push Code to GitHub
If you haven't already:
```bash
git add .
git commit -m "Prepare for deployment"
git push
```

## Step 2: (Optional) Create PostgreSQL Database

> **Note**: You can skip this step and use H2 database (in-memory), but your data will be lost when the service restarts. For production, PostgreSQL is recommended.

1.  On Render Dashboard, click **New +** → **PostgreSQL**.
2.  **Configure Database**:
    *   **Name**: `finance-db`
    *   **Database**: `finance` (or any name you prefer)
    *   **User**: (auto-generated)
    *   **Region**: Same as your backend service
    *   **Instance Type**: Free
3.  Click **Create Database**.
4.  Wait for the database to be created.
5.  Once created, go to the database page and copy the **Internal Database URL**.
6.  **Keep this URL handy** - you'll need it in the next step.

## Step 3: Deploy Backend (Java Spring Boot)

1.  On Render Dashboard, click **New +** → **Web Service**.
2.  Connect your GitHub repository (`finance_app`).
3.  **Configure Settings**:
    *   **Name**: `finance-backend`
    *   **Root Directory**: `backend`
    *   **Environment**: `Java`
    *   **Build Command**: `./mvnw clean package -DskipTests`
    *   **Start Command**: `java -jar target/app-0.0.1-SNAPSHOT.jar`
    *   **Instance Type**: Free
4.  **Add Environment Variables**:
    *   `JAVA_VERSION`: `17`
    *   `PORT`: `8080`
5.  **If you created PostgreSQL database in Step 2**, add these additional environment variables:
    *   `SPRING_DATASOURCE_URL`: Convert the Internal Database URL to JDBC format
      - Example: `postgres://user:pass@host:5432/db` → `jdbc:postgresql://host:5432/db`
    *   `SPRING_DATASOURCE_USERNAME`: (from database credentials)
    *   `SPRING_DATASOURCE_PASSWORD`: (from database credentials)
    *   `SPRING_JPA_HIBERNATE_DDL_AUTO`: `update`
6.  Click **Create Web Service**.
7.  Wait for deployment to complete (5-10 minutes).
8.  **Copy the Backend URL** (e.g., `https://finance-backend.onrender.com`).

## Step 4: Deploy Frontend (React)

1.  On Render Dashboard, click **New +** → **Static Site**.
2.  Connect the same GitHub repository.
3.  **Configure Settings**:
    *   **Name**: `finance-frontend`
    *   **Root Directory**: `frontend`
    *   **Build Command**: `npm install && npm run build`
    *   **Publish Directory**: `frontend/dist`
4.  **Add Environment Variable**:
    *   `VITE_API_URL`: Paste your **Backend URL** + `/api`
      - Example: `https://finance-backend.onrender.com/api`
5.  Click **Create Static Site**.
6.  Wait for deployment to complete.

## Step 5: Access Your App

Once both deployments are complete:
1.  Render will provide a Frontend URL (e.g., `https://finance-frontend.onrender.com`)
2.  Open this URL in any browser (desktop or mobile)
3.  Register a new account and start using your app!

## Important Notes

- **Free Tier Limitations**: 
  - Services may spin down after 15 minutes of inactivity
  - First request after inactivity may take 30-60 seconds to wake up
  - PostgreSQL free tier has 90-day expiration (data is deleted after 90 days)

- **CORS**: The backend is already configured to accept requests from any origin (`*`), which works for deployment.

- **HTTPS**: Render automatically provides HTTPS for all deployments.

## Troubleshooting

**Backend fails to start:**
- Check that `JAVA_VERSION` is set to `17`
- Verify the build command completed successfully in the logs

**Frontend can't connect to backend:**
- Ensure `VITE_API_URL` is set correctly with the full backend URL + `/api`
- Check that the backend service is running (green status on Render dashboard)

**Database connection errors:**
- Verify PostgreSQL environment variables are set correctly
- Ensure you're using the **Internal Database URL** (not external)
