"use strict";

/**
 * @typedef {import('../../types/typedefs').PluginConfigMap} PluginConfigMap
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

module.exports = {
  buildConfig,
};
