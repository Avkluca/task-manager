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
