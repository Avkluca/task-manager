# Terraform Azure Setup

This folder defines a small Azure infrastructure setup for the Task Manager project.

It is designed for an Azure for Students account by using Azure Static Web Apps on the Free tier, Azure Container Registry on the Basic SKU, and Azure Cosmos DB with the free tier enabled. The backend API URL is passed as an app setting, so the existing deployed backend can continue to be used.

The Terraform configuration defines:

- Azure Resource Group
- Azure Container Registry
- Azure Cosmos DB for NoSQL
- Cosmos DB database named `taskmanagerdb`
- Cosmos DB container named `tasks` with partition key `/id`
- Azure Static Web App

The resource group defaults to `Central India`, while the Static Web App defaults to `East US 2` because Static Web Apps are not available in every Azure region. If your subscription policy requires another supported Static Web Apps region, update `static_web_app_location` in `terraform.tfvars`.

## Commands

```powershell
az login
cd terraform
terraform init
terraform plan
terraform apply
```

To customize names before applying:

```powershell
Copy-Item terraform.tfvars.example terraform.tfvars
```

Then edit `terraform.tfvars`.

## Cost Note

Terraform itself is free. The Static Web App in this configuration uses the Free SKU. Azure Container Registry Basic is the lowest-cost ACR tier, but it can still use Azure credit. Always check the Azure portal before applying changes, especially if you add backend hosting, databases, or container services later.
