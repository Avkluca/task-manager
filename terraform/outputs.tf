output "resource_group_name" {
  description = "Created Azure resource group."
  value       = azurerm_resource_group.main.name
}

output "static_web_app_name" {
  description = "Created Azure Static Web App name."
  value       = azurerm_static_web_app.frontend.name
}

output "static_web_app_default_host_name" {
  description = "Default hostname for the Azure Static Web App."
  value       = azurerm_static_web_app.frontend.default_host_name
}

output "acr_login_server" {
  description = "Azure Container Registry login server used by Docker."
  value       = azurerm_container_registry.main.login_server
}

output "acr_name" {
  description = "Azure Container Registry name."
  value       = azurerm_container_registry.main.name
}

output "cosmos_endpoint" {
  description = "Azure Cosmos DB endpoint used by the backend."
  value       = azurerm_cosmosdb_account.main.endpoint
}

output "cosmos_database_name" {
  description = "Azure Cosmos DB database name."
  value       = azurerm_cosmosdb_sql_database.tasks.name
}

output "cosmos_container_name" {
  description = "Azure Cosmos DB container name."
  value       = azurerm_cosmosdb_sql_container.tasks.name
}
