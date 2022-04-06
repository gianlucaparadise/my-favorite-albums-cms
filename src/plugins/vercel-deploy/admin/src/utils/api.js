import axios from "./axiosInstance";
import pluginId from "../pluginId";

export const fetchContentTypes = async () => {
  try {
    const data = await axios(`/${pluginId}/content-types`, { method: "GET" });
    return data.data;
  } catch (error) {
    return null;
  }
};
