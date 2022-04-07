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
