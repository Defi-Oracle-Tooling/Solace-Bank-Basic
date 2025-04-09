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

### 1. Set Up Azure Resources

You need to provision the following services:

#### Azure Static Web App
1. Go to the Azure Portal and click "Create a resource"
2. Search for "Static Web App" and select it
3. Click "Create"
4. Fill in the basics:
  - Select your subscription and resource group
  - Name your app (e.g., "solace-bank-frontend")
  - Select a region close to your users
  - Choose "Free" for the SKU
5. In the "Deployment details" section:
  - Select GitHub as the source
  - Authenticate and select your repository
  - Set branch to "main"
6. Configure the build details:
  - Build preset: "React"
  - App location: "/"
  - Api location: "api"
  - Output location: "dist"
7. Click "Review + create" and then "Create"

#### Azure Function App
1. In the Azure Portal, click "Create a resource"
2. Search for "Function App" and select it
3. Click "Create"
4. Configure the basics:
  - Select your subscription and resource group
  - Function App name: "solace-bank-api"
  - Publish: "Code"
  - Runtime stack: "Node.js"
  - Version: "18 LTS"
  - Region: (select the same as your Static Web App)
5. Click "Next: Hosting"
6. Configure storage and plan:
  - Create a new storage account or select existing
  - Operating system: "Linux"
  - Plan type: "Consumption (Serverless)"
7. Click "Next: Networking" > "Next: Monitoring" > "Review + create" > "Create"
8. After creation, navigate to your Function App
9. Go to "Configuration" and add these application settings:
  - PG_CONN: Your PostgreSQL connection string
  - NODE_ENV: "production"
10. Save the settings

#### Azure Database for PostgreSQL
1. In the Azure Portal, click "Create a resource"
2. Search for "Azure Database for PostgreSQL" and select "Flexible Server"
3. Click "Create"
4. Configure server details:
  - Select your subscription and resource group
  - Server name: "solacebank-db"
  - Region: (select the same as your other resources)
  - PostgreSQL version: "14" (or latest stable)
5. Configure admin account:
  - Admin username: Create a secure username
  - Password: Create a secure password (save this!)
6. Click "Next: Networking"
7. Configure network settings:
  - Allow public access from selected networks
  - Add your client IP address
  - Allow Azure services to access server
8. Click "Next: Security" > "Next: Tags" > "Review + create" > "Create"
9. After creation, connect to your database using a PostgreSQL client
10. Create the database:
   ```sql
   CREATE DATABASE solacebank;
   ```
11. Note your connection string for use in the Function App:
   ```
   postgresql://username:password@servername.postgres.database.azure.com:5432/solacebank
   ```

Remember to save all connection strings and credentials securely. Do not commit them to your repository.

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
