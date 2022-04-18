/**
 *
 * DeploymentsContainer
 *
 */

import React from "react";
import { Loader } from "@strapi/design-system/Loader";
import { Flex } from "@strapi/design-system/Flex";

import { useDeployments } from "../../hooks/useDeployments";
import DeploymentsEmptyState from "../DeploymentsEmptyState";
import DeploymentsList from "../DeploymentsList";

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
      <Flex justifyContent="center">
        <Loader>Loading content...</Loader>
      </Flex>
    );
  }

  if (!deployments || deployments?.length <= 0) {
    return (
      <DeploymentsEmptyState listDeployAvailability="MISSING_DEPLOYMENTS" />
    );
  }

  return <DeploymentsList deployments={deployments} />;
};

export default DeploymentsContainer;
