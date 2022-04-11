"use strict";

/**
 * @typedef {import('../../types/typedefs').PluginConfig} PluginConfig
 */

module.exports = ({ strapi }) => ({
  /**
   * Build and return plugin config reading from process.env
   * @returns {PluginConfig}
   */
  getConfig() {
    return {
      data: {
        deployHook: process.env.VERCEL_DEPLOY_PLUGIN_HOOK,
      },
    };
  },
});
