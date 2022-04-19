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
const DeploymentsContainer = ({ usePolling, onDeploymentsFetched }) => {
  const [isLoadingDeployments, deployments] = useDeployments(
    usePolling,
    onDeploymentsFetched
  );

  const hasEmptyDeployments = !deployments || deployments?.length <= 0;

  if (isLoadingDeployments && hasEmptyDeployments) {
    return (
      <Flex justifyContent="center">
        <Loader>Loading content...</Loader>
      </Flex>
    );
  }

  if (hasEmptyDeployments) {
    return (
      <DeploymentsEmptyState listDeployAvailability="MISSING_DEPLOYMENTS" />
    );
  }

  return <DeploymentsList deployments={deployments} />;
};

export default DeploymentsContainer;
