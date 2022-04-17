/**
 *
 * DeploymentsContainer
 *
 */

import React from "react";
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";

import { useDeployments } from "../../hooks/useDeployments";

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
  const [isLoadingDeployments, deployments] = useDeployments();

  if (isLoadingDeployments) {
    return (
      <Flex>
        <Loader>Loading content...</Loader>
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
