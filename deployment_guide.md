# Deployment Guide for Personal Finance App

This guide explains how to deploy your application to **Render** (a cloud provider with a free tier) so you can access it from anywhere, including your phone, without your computer being on.

## Prerequisites
1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).

## Step 1: Push Code to GitHub
1.  Initialize git in your project root:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Link and push:
    ```bash
    git remote add origin <your-github-repo-url>
    git push -u origin main
    ```

## Step 2: Deploy Backend (Spring Boot)
1.  On Render Dashboard, click **New +** -> **Web Service**.
2.  Connect your GitHub repository.
3.  Select the repository `finance-app` (or whatever you named it).
4.  **Settings**:
    *   **Name**: `finance-backend`
    *   **Region**: Singapore (or closest to you)
    *   **Runtime**: **Java**
    *   **Build Command**: `cd backend && ./mvnw clean package -DskipTests`
    *   **Start Command**: `java -jar backend/target/app-0.0.1-SNAPSHOT.jar`
    *   **Environment Variables**:
        *   `JAVA_VERSION`: `17`
        *   `PORT`: `8080`
5.  **Database (Optional but Recommended)**:
    *   Create a **New +** -> **PostgreSQL** database on Render (Free tier).
    *   Copy the `Internal Database URL`.
    *   In your Backend Web Service settings, add an Environment Variable:
        *   `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<hostname>:5432/<database_name>` (Replace with the internal URL, changing `postgres://` to `jdbc:postgresql://`)
        *   `SPRING_DATASOURCE_USERNAME`: `<your_db_user>`
        *   `SPRING_DATASOURCE_PASSWORD`: `<your_db_password>`
6.  Click **Create Web Service**.
7.  Wait for it to deploy. Copy the **Backend URL** (e.g., `https://finance-backend.onrender.com`).

## Step 3: Deploy Frontend (React)
1.  On Render Dashboard, click **New +** -> **Static Site**.
2.  Connect the same GitHub repository.
3.  **Settings**:
    *   **Name**: `finance-frontend`
    *   **Build Command**: `cd frontend && npm install && npm run build`
    *   **Publish Directory**: `frontend/dist`
    *   **Environment Variables**:
        *   `VITE_API_URL`: Paste your **Backend URL** here (e.g., `https://finance-backend.onrender.com/api`)
4.  Click **Create Static Site**.
5.  Wait for deployment.

## Step 4: Access on Phone
Once the frontend is deployed, Render will give you a URL (e.g., `https://finance-frontend.onrender.com`).
Open this URL on your phone's browser. You can now use the app 24/7!
