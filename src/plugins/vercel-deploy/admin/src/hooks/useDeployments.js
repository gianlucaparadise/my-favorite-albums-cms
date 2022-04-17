import { useEffect, useState } from "react";

import { getDeployments } from "../utils/api";

/**
 * @typedef {import('../../../types/typedefs').Deployment} Deployment
 */

/**
 * Fetch and return the list of deployments
 * @returns {[Boolean, Deployment[]]}
 */
export function useDeployments() {
  /** @type {Deployment[]} */
  const initialDeployments = [];
  const [deployments, setDeployments] = useState(initialDeployments);
  const [isLoadingDeployments, setIsLoadingDeployments] = useState(true);

  useEffect(() => {
    getDeployments()
      .then((response) => {
        setDeployments(response.deployments);
      })
      .catch((error) => {
        console.error(
          "[vercel-deploy] error while retrieving deployments",
          error
        );
        setDeployments([]);
      })
      .finally(() => {
        setIsLoadingDeployments(false);
      });
  }, [setDeployments, setIsLoadingDeployments]);

  return [isLoadingDeployments, deployments];
}
