# Terraform Azure Setup

This folder defines a small Azure infrastructure setup for the Task Manager project.

It is designed for an Azure for Students account by using Azure Static Web Apps on the Free tier. The backend API URL is passed as an app setting, so the existing deployed backend can continue to be used.

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

Terraform itself is free. The Static Web App in this configuration uses the Free SKU. Always check the Azure portal before applying changes, especially if you add backend hosting, databases, or container services later.
