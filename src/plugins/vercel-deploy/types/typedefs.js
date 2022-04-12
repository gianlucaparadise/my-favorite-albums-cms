/**
 * @namespace typedefs
 */

/**
 * Plugin config
 * @typedef {Object} PluginConfig
 * @property {PluginConfigMap} data Plugin config root property
 */

/**
 * Plugin config map
 * @typedef {Object} PluginConfigMap
 * @property {?string} deployHook Url of the git deploy hook exposed in Vercel. Env variable: VERCEL_DEPLOY_PLUGIN_HOOK
 */

/**
 * Describe the availability of the run deploy feature
 * @typedef {("AVAILABLE"|"MISSING_CONFIG_OBJECT"|"MISSING_CONFIG_VARIABLE")} RunDeployFeatureAvailability
 */

/**
 * @typedef {Object} DeployAvailabilityResponse
 * @property {DeployAvailability} data Root object with the availabilities
 */

/**
 * @typedef {Object} DeployAvailability
 * @property {RunDeployFeatureAvailability} runDeploy Describe the availability of the run deploy feature
 */

exports.unused = {};
