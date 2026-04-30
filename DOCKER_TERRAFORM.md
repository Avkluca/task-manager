# Docker and Terraform Implementation

This project includes Docker support for local containerized development and Terraform support for Azure infrastructure.

## Docker

Run the full app locally with:

```powershell
docker compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MongoDB: `localhost:27017`

The backend container receives `MONGO_URI=mongodb://mongo:27017/task-manager` from `docker-compose.yml`.

Stop the containers with:

```powershell
docker compose down
```

Remove the local MongoDB volume if you want a clean database:

```powershell
docker compose down -v
```

If Docker is not installed locally, the repository also includes a GitHub Actions workflow at `.github/workflows/docker-build.yml`. It builds the backend and frontend Docker images on GitHub's Ubuntu runner and pushes them to Azure Container Registry.

Required GitHub repository secrets for ACR push:

- `ACR_LOGIN_SERVER`
- `ACR_USERNAME`
- `ACR_PASSWORD`

The pushed images are:

- `task-manager-backend:latest`
- `task-manager-frontend:latest`
- commit-SHA tagged versions of both images

## Terraform

Terraform files are in the `terraform/` folder.

The current configuration creates:

- Azure Resource Group
- Azure Container Registry using the Basic SKU
- Azure Static Web App using the Free SKU
- App setting for the backend API URL

Commands:

```powershell
cd terraform
terraform init
terraform plan
terraform apply
```

This is intentionally small for an Azure for Students account. Docker proves the app is containerized, while Terraform proves the cloud infrastructure can be provisioned as code.
