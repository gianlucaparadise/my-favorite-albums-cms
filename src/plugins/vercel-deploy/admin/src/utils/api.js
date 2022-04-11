import axios from "./axiosInstance";
import pluginId from "../pluginId";

export const runDeploy = async () => {
  try {
    const data = await axios(`/${pluginId}/run-deploy`, { method: "GET" });
    return data.data;
  } catch (error) {
    console.error("vercel-deploy: Error while running a deploy", error);
    return null;
  }
};

export const getConfig = async () => {
  try {
    const response = await axios(`/${pluginId}/config`, { method: "GET" });
    return response.data;
  } catch (error) {
    console.error("vercel-deploy: Error while fetching configs", error);
    return null;
  }
};
