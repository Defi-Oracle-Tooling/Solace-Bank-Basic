# Solace Bank Trust - Fullstack Banking Application

## Overview
Solace Bank Trust is a secure, production-ready fullstack banking platform built with React (frontend), Azure Functions (backend), and PostgreSQL (database). It supports client login, account dashboards, transaction administration by employees, and full Azure deployment.

## Features
- **Frontend**: React with TailwindCSS, React Router for routing.
- **Backend**: Azure Functions with Node.js, PostgreSQL integration.
- **Database**: PostgreSQL with schema for users and accounts.
- **Security**: Password hashing with bcrypt, environment variables for sensitive data.
- **DevOps**: Dockerized setup, GitHub Actions CI/CD for Azure deployment.

## Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- Azure account with access to:
  - Static Web Apps
  - Function Apps
  - Azure Database for PostgreSQL

## Local Development

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Solace-Bank-Basic
```

### 2. Set Up Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
Update the values in `.env` as needed.

### 3. Start the Application
Use Docker Compose to start the services:
```bash
docker-compose up --build
```
Access the application:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend (Azure Functions runtime): [http://localhost:7071](http://localhost:7071)
- PostgreSQL Database: `localhost:5432`

## Deployment to Azure

### 1. Set Up Azure Resources

You need to provision the following services:

- **Azure Static Web App**
  - Hosts the frontend (React app).
  - Connect your GitHub repository.

- **Azure Function App**
  - Deploy the `api/` folder with your backend logic.
  - Use Node.js 18 and link to your PostgreSQL database.

- **Azure Database for PostgreSQL**
  - Create a flexible server instance.
  - Configure firewall rules to allow access from Azure services and your IP.
  - Create database `solacebank`.

### 2. Set Secrets in GitHub Repository

Go to your GitHub repository → Settings → Secrets → Actions, and add:

- `AZURE_STATIC_WEB_APPS_API_TOKEN`
- `PG_CONN` (your full PostgreSQL connection string)

### 3. Configure GitHub Actions
Ensure the `.github/workflows/azure-static-web-apps.yml` includes:
```yaml
with:
  app_location: "/"
  api_location: "/api"
  output_location: "dist"
```
Modify the `build` and `deploy` steps if your directory structure differs.

### 4. Deploy
Push changes to the `main` branch:
```bash
git add .
git commit -m "Deploying to Azure"
git push origin main
```
GitHub Actions will automatically trigger deployment to Azure Static Web App and Azure Functions.

## Database Management

### Initialize Database
Run the following command to initialize the database schema and seed data:
```bash
docker exec -i <db-container-name> psql -U admin -d solacebank < init-db/init.sql
```

### Teardown Database
To drop all tables, run:
```bash
docker exec -i <db-container-name> psql -U admin -d solacebank < teardown.sql
```

## License
This project is licensed under the MIT License.
