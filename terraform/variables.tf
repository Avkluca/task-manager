variable "resource_group_name" {
  description = "Name of the Azure resource group for the project."
  type        = string
  default     = "rg-task-manager-student"
}

variable "location" {
  description = "Azure region for the resource group."
  type        = string
  default     = "Central India"
}

variable "static_web_app_location" {
  description = "Azure Static Web Apps deployment region."
  type        = string
  default     = "East US 2"
}

variable "static_web_app_name" {
  description = "Name of the Azure Static Web App."
  type        = string
  default     = "task-manager-student-swa"
}

variable "backend_api_url" {
  description = "Backend API endpoint used by the React app."
  type        = string
  default     = "https://akshayapp12345-fjatg0aefvgcdpdd.centralindia-01.azurewebsites.net/api/tasks"
}

variable "tags" {
  description = "Tags applied to Azure resources."
  type        = map(string)
  default = {
    project     = "task-manager"
    environment = "student-demo"
    managed-by  = "terraform"
  }
}
