"use strict";

module.exports = ({ strapi }) => ({
  getConfig() {
    return {
      data: {
        deployHook: process.env.VERCEL_DEPLOY_PLUGIN_HOOK,
      },
    };
  },
});
