@description('The location of the PostgreSQL Flexible Server')
param location string = resourceGroup().location

@description('The name of the PostgreSQL Flexible Server')
param serverName string = 'solacebank-db'

@description('The administrator username for the PostgreSQL Flexible Server')
param administratorLogin string = 'adminSBG'

@secure()
@description('The administrator password for the PostgreSQL Flexible Server')
param administratorLoginPassword string

@description('The SKU tier for the PostgreSQL Flexible Server')
param skuTier string = 'GeneralPurpose'

@description('The SKU name for the PostgreSQL Flexible Server')
param skuName string = 'Standard_D4s_v3'

@description('The storage size in GB for the PostgreSQL Flexible Server')
param storageSizeGB int = 64

@description('The backup retention days for the PostgreSQL Flexible Server')
param backupRetentionDays int = 7

@description('The version of PostgreSQL')
param version string = '16'

@description('The name of the Static Web App')
param staticWebAppName string = 'SolaceBankingPortal-Basic'

@description('The name of the Key Vault')
param keyVaultName string = 'solacebank-kv'

resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2024-08-01' = {
  name: serverName
  location: location
  sku: {
    name: skuName
    tier: skuTier
  }
  properties: {
    administratorLogin: administratorLogin
    administratorLoginPassword: administratorLoginPassword
    version: version
    storage: {
      storageSizeGB: storageSizeGB
      autoGrow: 'Disabled'
    }
    backup: {
      backupRetentionDays: backupRetentionDays
      geoRedundantBackup: 'Disabled'
    }
    network: {
      publicNetworkAccess: 'Enabled'
    }
    highAvailability: {
      mode: 'Disabled'
    }
    authConfig: {
      activeDirectoryAuth: 'Disabled'
      passwordAuth: 'Enabled'
    }
  }
}

resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' existing = {
  name: staticWebAppName
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' = {
  name: keyVaultName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    accessPolicies: [
      {
        tenantId: subscription().tenantId
        objectId: staticWebApp.identity.principalId
        permissions: {
          secrets: ['get', 'list']
        }
      }
    ]
  }
}

resource dbConnectionStringSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  name: 'DBConnectionString'
  parent: keyVault
  properties: {
    value: 'Server=${postgresServer.name}.postgres.database.azure.com;Database=mydb;User Id=${administratorLogin}@${postgresServer.name};Password=${administratorLoginPassword};Ssl Mode=Require;'
  }
}

resource postgresFirewallRule 'Microsoft.DBforPostgreSQL/flexibleServers/firewallRules@2024-08-01' = {
  name: 'AllowStaticWebApp'
  parent: postgresServer
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}
