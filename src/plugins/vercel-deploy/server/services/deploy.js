"use strict";

const axios = require("axios").default;

module.exports = ({ strapi }) => ({
  async runDeploy() {
    try {
      const response = await axios.post(
        "https://api.vercel.com/v1/integrations/deploy/deploy-url-to-be-saved-in-env-variable" // TODO move url to config
      );

      const deployId = response?.data?.job?.id;
      if (!deployId) {
        throw new Error(
          `Deployment Id not received. Response: ${JSON.stringify(response)}`
        );
      }

      return deployId;
    } catch (error) {
      console.error("vercel-deploy: Error while deploying", error);
      return {};
    }
  },
});
