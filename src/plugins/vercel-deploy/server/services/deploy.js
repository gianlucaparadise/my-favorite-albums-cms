"use strict";

const axios = require("axios").default;
const { buildConfig, getRunDeployAvailability } = require("./utils");

/**
 * @typedef {import('../../types/typedefs').DeployAvailabilityResponse} DeployAvailabilityResponse
 */

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

  /**
   * Build the availability for each feature
   * @returns {DeployAvailabilityResponse}
   */
  deployAvailability() {
    try {
      const config = buildConfig();
      const runDeployAvailability = getRunDeployAvailability(config);

      return {
        data: {
          runDeploy: runDeployAvailability,
        },
      };
    } catch (error) {
      console.error(
        "[vercel-deploy] Error while building deploy availability -",
        error
      );
      return {};
    }
  },
});
