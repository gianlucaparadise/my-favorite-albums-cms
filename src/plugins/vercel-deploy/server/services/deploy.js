"use strict";

const axios = require("axios").default;
const { buildConfig } = require("./utils");

module.exports = ({ strapi }) => ({
  async runDeploy() {
    try {
      const config = buildConfig();
      if (!config || !config.deployHook) {
        throw "missing configuration: deployHook";
      }

      const response = await axios.post(config.deployHook);

      const deployId = response?.data?.job?.id;
      if (!deployId) {
        throw new Error(
          `Deployment Id not received. Response: ${JSON.stringify(response)}`
        );
      }

      return deployId;
    } catch (error) {
      console.error("[vercel-deploy] Error while deploying -", error);
      return {};
    }
  },
});
