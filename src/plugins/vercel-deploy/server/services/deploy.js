"use strict";

const axios = require("axios").default;
const { buildConfig, getFeatureAvailability } = require("./utils");

/**
 * @typedef {import('../../types/typedefs').DeployAvailabilityResponse} DeployAvailabilityResponse
 * @typedef {import('../../types/typedefs').GetDeploymentsResponse} GetDeploymentsResponse
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
      // TODO: error handling
      return {};
    }
  },

  /**
   * Fetch the list of deployments from Vercel
   * @returns {GetDeploymentsResponse}
   */
  async getDeployments() {
    try {
      const config = buildConfig();
      if (!config || !config.apiToken) {
        throw "missing configuration: deployHook";
      }

      const response = await axios.get(
        "https://api.vercel.com/v6/deployments",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("vercel-deploy: Error while fetching deployments", error);
      // TODO: error handling
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
      const runDeployAvailability = getFeatureAvailability(
        config,
        "deployHook"
      );
      const listDeployAvailability = getFeatureAvailability(config, "apiToken");

      return {
        data: {
          runDeploy: runDeployAvailability,
          listDeploy: listDeployAvailability,
        },
      };
    } catch (error) {
      console.error(
        "[vercel-deploy] Error while building deploy availability -",
        error
      );
      // TODO: error handling
      return {};
    }
  },
});
