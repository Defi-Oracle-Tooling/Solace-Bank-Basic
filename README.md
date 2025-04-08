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
- Azure account

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
- Backend: [http://localhost:7071](http://localhost:7071)
- Database: `localhost:5432`

## Deployment to Azure

### 1. Set Up Azure Resources
- Create an Azure Static Web App for the frontend.
- Create an Azure Function App for the backend.
- Set up a PostgreSQL database in Azure.

### 2. Configure GitHub Actions
Ensure the `.github/workflows/azure-static-web-apps.yml` file is configured with your Azure credentials and resource details.

### 3. Deploy
Push your changes to the `main` branch. GitHub Actions will automatically deploy the application to Azure.

## Database Management

### Initialize Database
Run the following command to initialize the database schema and seed data:
```bash
docker exec -i <db-container-name> psql -U user -d solacebank < init-db/init.sql
```

### Teardown Database
To drop all tables, run:
```bash
docker exec -i <db-container-name> psql -U user -d solacebank < teardown.sql
```

## License
This project is licensed under the MIT License.