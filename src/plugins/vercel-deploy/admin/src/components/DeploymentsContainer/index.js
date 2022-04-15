/**
 *
 * DeploymentsContainer
 *
 */

import React, { useEffect, useState } from "react";
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";

import { getDeployments } from "../../utils/api";

/**
 * @typedef {import('./typedefs').Deployment} Deployment
 * @typedef {import('./typedefs').Props} Props
 */

/**
 * Displays the of deployments
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeploymentsContainer = () => {
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

  if (isLoadingDeployments) {
    return (
      <Flex>
        <Loader justifyContent="center">Loading content...</Loader>
      </Flex>
    );
  }

  if (!deployments || deployments?.length <= 0) {
    return <Flex justifyContent="center">{"Empty state here"}</Flex>;
  }

  return (
    <Flex justifyContent="center">{`You have ${deployments.length} deployments`}</Flex>
  );
};

export default DeploymentsContainer;
