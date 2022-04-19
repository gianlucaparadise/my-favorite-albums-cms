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
 * @property {?string} apiToken API token for the Vercel integration. Env variable: VERCEL_DEPLOY_PLUGIN_API_TOKEN
 */

/**
 * Describe the availability of a feature
 * @typedef {("AVAILABLE"|"MISSING_CONFIG_OBJECT"|"MISSING_CONFIG_VARIABLE")} FeatureAvailability
 */

/**
 * @typedef {Object} DeployAvailabilityResponse
 * @property {DeployAvailability} data Root object with the availabilities
 */

/**
 * @typedef {Object} DeployAvailability
 * @property {FeatureAvailability} runDeploy Describe the availability of the run deploy feature
 * @property {FeatureAvailability} listDeploy Describe the availability of the deploy list feature
 */

/**
 * @typedef {Object} GetDeploymentsResponse
 * @property {Deployment[]} deployments
 */

/**
 * @typedef {Object} Deployment
 * @property {string} uid The unique identifier of the deployment.
 * @property {string} name The name of the deployment.
 * @property {string} url The URL of the deployment.
 * @property {number} created Timestamp of when the deployment got created.
 * @property {DeploymentState} state In which state is the deployment.
 * @property {string} inspectorUrl Vercel URL to inspect the deployment.
 */

/**
 * This list is taken from https://vercel.com/docs/rest-api#endpoints/deployments
 * @typedef {"BUILDING"|"ERROR"|"INITIALIZING"|"QUEUED"|"READY"|"CANCELED"} DeploymentState
 */

/**
 * Callback to notify that the list of deployments has been fetched
 * @callback DeploymentsFetched
 * @param {boolean} hasNonFinalState This is true when at least one of the deployments is not in final a state
 * @returns {void}
 */

exports.unused = {};
