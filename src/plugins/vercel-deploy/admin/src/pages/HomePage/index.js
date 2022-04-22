/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from "react";

import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { Button } from "@strapi/design-system/Button";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";
import { Stack } from "@strapi/design-system/Stack";
import { Loader } from "@strapi/design-system/Loader";

import SymmetricBox from "../../components/SymmetricBox";
import DeployErrorMessage from "../../components/DeployErrorMessage";
import DeploymentsContainer from "../../components/DeploymentsContainer";
import { runDeploy } from "../../utils/api";
import { useDeployAvailability } from "../../hooks/useDeployAvailability";
import DeploymentsEmptyState from "../../components/DeploymentsEmptyState";

/**
 * @typedef {import('../../../../types/typedefs').DeploymentsFetched} DeploymentsFetched
 */

const HomePage = () => {
  const [isLoadingAvailability, availability, hasAvailabilityError] =
    useDeployAvailability();

  const [useDeploymentsPolling, setUseDeploymentsPolling] = useState(false);
  /** @type {DeploymentsFetched} */
  const onDeploymentsFetched = (hasNonFinalState) => {
    // I want to keep fetching deployments if there is a deployment in progress until it finishes
    setUseDeploymentsPolling(hasNonFinalState);
  };

  if (isLoadingAvailability) {
    return <LoadingIndicatorPage />;
  }

  const canDeploy = availability?.runDeploy == "AVAILABLE";

  const runDeployHandler = async () => {
    const response = await runDeploy();
    console.log("[vercel-deploy] deploy response", response);
    setUseDeploymentsPolling(true);
  };

  const canListDeploy = availability?.listDeploy == "AVAILABLE";

  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout
          title="Vercel Deploy"
          subtitle="Deploy your website hosted on Vercel"
          as="h2"
        />
      </Box>
      <SymmetricBox paddingHorizontal={8} paddingVertical={2}>
        <Box padding={4}>
          <Stack>
            <Typography variant="beta">Manual deploy</Typography>
            <Typography variant="pi" textColor="neutral600">
              Start a deployment on Vercel using the webhook you configured
            </Typography>
          </Stack>
        </Box>
        <Stack horizontal>
          <SymmetricBox paddingHorizontal={4}>
            <Button onClick={runDeployHandler} disabled={!canDeploy}>
              Deploy
            </Button>
          </SymmetricBox>
          {canDeploy ? (
            <></>
          ) : (
            <SymmetricBox paddingHorizontal={4}>
              <DeployErrorMessage
                deployAvailability={availability?.runDeploy}
              />
            </SymmetricBox>
          )}
        </Stack>
      </SymmetricBox>
      <SymmetricBox paddingHorizontal={8} paddingVertical={2}>
        <Box padding={4}>
          <Flex alignItems="center">
            <Stack>
              <Typography variant="beta">Deployments</Typography>
              <Typography variant="pi" textColor="neutral600">
                Latest deployments on you Vercel account
              </Typography>
            </Stack>
            {useDeploymentsPolling && (
              <SymmetricBox paddingHorizontal={2} paddingVertical={0}>
                <Loader small>Fetching deployments</Loader>
              </SymmetricBox>
            )}
          </Flex>
        </Box>
        {canListDeploy ? (
          <DeploymentsContainer
            usePolling={useDeploymentsPolling}
            onDeploymentsFetched={onDeploymentsFetched}
          />
        ) : (
          <DeploymentsEmptyState
            listDeployAvailability={
              hasAvailabilityError
                ? "ERROR_AVAILABILITY"
                : availability?.listDeploy
            }
          />
        )}
      </SymmetricBox>
    </>
  );
};

export default memo(HomePage);
