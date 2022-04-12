"use strict";

/**
 * @typedef {import('../../types/typedefs').PluginConfigMap} PluginConfigMap
 * @typedef {import('../../types/typedefs').RunDeployFeatureAvailability} RunDeployFeatureAvailability
 */

/**
 * Build config map object
 * @returns {PluginConfigMap}
 */
const buildConfig = () => {
  return {
    deployHook: process.env.VERCEL_DEPLOY_PLUGIN_HOOK,
  };
};

/**
 * Return the availability for the runDeploy feature
 * @param {PluginConfigMap} config Configuration file
 * @returns {RunDeployFeatureAvailability}
 */
const getRunDeployAvailability = (config) => {
  if (!config) {
    return "MISSING_CONFIG_OBJECT";
  }

  if (!config.deployHook) {
    return "MISSING_CONFIG_VARIABLE";
  }

  return "AVAILABLE";
};

module.exports = {
  buildConfig,
  getRunDeployAvailability,
};
