import axios from "./axiosInstance";
import pluginId from "../pluginId";

/**
 * @typedef {import('../../../types/typedefs').PluginConfig} PluginConfig
 * @typedef {import('../../../types/typedefs').DeployAvailabilityResponse} DeployAvailabilityResponse
 */

export const runDeploy = async () => {
  try {
    const data = await axios(`/${pluginId}/run-deploy`, { method: "GET" });
    return data.data;
  } catch (error) {
    console.error("vercel-deploy: Error while running a deploy", error);
    return null;
  }
};

/**
 * Fetch and return plugin config
 * @returns {Promise<PluginConfig>}
 */
export const getConfig = async () => {
  try {
    const response = await axios(`/${pluginId}/config`, { method: "GET" });
    return response.data;
  } catch (error) {
    console.error("vercel-deploy: Error while fetching configs", error);
    return null;
  }
};

/**
 * Fetch the availability for each deploy feature
 * @returns {Promise<DeployAvailabilityResponse>}
 */
export const deployAvailability = async () => {
  try {
    const data = await axios(`/${pluginId}/deploy/availability`, {
      method: "GET",
    });
    return data.data;
  } catch (error) {
    console.error(
      "vercel-deploy: Error while fetching deploy availability",
      error
    );
    return null;
  }
};
