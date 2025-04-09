targetScope = 'subscription'

@description('The location for all resources')
param location string = 'West Europe'

@description('The environment name for the deployment')
param environmentName string = 'SolaceBankWeb'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' existing = {
  name: environmentName
}

output RESOURCE_GROUP_ID string = resourceGroup.id

module solacebankDb './solacebank-db.bicep' = {
  name: 'solacebankDb'
  scope: resourceGroup
  params: {
    location: location
    serverName: 'solacebank-db'
    administratorLogin: 'adminSBG'
    administratorLoginPassword: 'YourSecurePasswordHere'
    skuTier: 'GeneralPurpose'
    skuName: 'Standard_D4s_v3'
    storageSizeGB: 64
    backupRetentionDays: 7
    version: '16'
    staticWebAppName: 'SolaceBankingPortal-Basic'
    keyVaultName: 'solacebank-kv'
  }
}
