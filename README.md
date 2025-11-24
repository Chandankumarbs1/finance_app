# Personal Finance App

A modern, full-stack personal finance application to track your income and expenses. Built with **Java Spring Boot** (Backend) and **React** (Frontend).

## Features
- � **Multi-User Support**: Secure Login and Registration system.
- 🛡️ **Data Privacy**: Each user has their own private dashboard and transaction history.
- �💰 **Track Transactions**: Add income (Credit) and expense (Debit) transactions.
- 📊 **Monthly Reports**: View total income, expense, and balance for the current month.
- 📈 **Visual Insights**: Interactive pie chart showing Income vs Expense.
- 🇮🇳 **INR Currency**: Native support for Indian Rupee (₹).
- 📱 **Mobile Friendly**: Responsive design accessible via local network.

## Tech Stack
- **Backend**: Java 17, Spring Boot 3.2.0, Spring Security (JWT), Spring Data JPA, H2 Database (Dev), PostgreSQL (Prod).
- **Frontend**: React 19, Vite, Tailwind CSS v3, Recharts, Axios, Lucide React.

## Getting Started

### Prerequisites
- **Java 17** or later
- **Node.js** (v20 or later recommended)

### Running Locally

1.  **Start the Backend**
    ```bash
    cd backend
    ./mvnw spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

2.  **Start the Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The frontend will start on `http://localhost:5173`.

3.  **Access the App**
    Open your browser and go to `http://localhost:5173`.
    *   You will be redirected to the **Login** page.
    *   Click **Register** to create a new account.
    *   Log in to access your dashboard.

## Mobile Access (Local Network)
To access the app from your phone:
1.  Ensure your phone and computer are on the same Wi-Fi.
2.  Find your computer's local IP address (e.g., `192.168.x.x`).
3.  Open `http://<YOUR_IP>:5173` on your phone.

## Deployment
This project is ready for deployment on **Render**.
See [Deployment Guide](deployment_guide.md) for detailed instructions.

## License
This project is open source and available under the [MIT License](LICENSE).
