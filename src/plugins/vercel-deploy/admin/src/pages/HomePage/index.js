/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";

import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { Button } from "@strapi/design-system/Button";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Flex } from "@strapi/design-system/Flex";

import DeployErrorMessage from "../../components/DeployErrorMessage";
import DeploymentsContainer from "../../components/DeploymentsContainer";
import { runDeploy } from "../../utils/api";
import { useDeployAvailability } from "../../hooks/useDeployAvailability";
import DeploymentsEmptyState from "../../components/DeploymentsEmptyState";

const HomePage = () => {
  const [isLoadingAvailability, availability] = useDeployAvailability();

  if (isLoadingAvailability) {
    return <LoadingIndicatorPage />;
  }

  const canDeploy = availability?.runDeploy == "AVAILABLE";

  const runDeployHandler = async () => {
    const response = await runDeploy();
    console.log("[vercel-deploy] deploy response", response);
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
      <Box padding={8}>
        <Flex>
          <Box padding={4}>
            <Button onClick={runDeployHandler} disabled={!canDeploy}>
              Deploy
            </Button>
          </Box>
          {canDeploy ? (
            <></>
          ) : (
            <Box padding={4}>
              <DeployErrorMessage
                deployAvailability={availability?.runDeploy}
              />
            </Box>
          )}
        </Flex>
      </Box>
      <Box padding={8}>
        {canListDeploy ? (
          <DeploymentsContainer />
        ) : (
          <DeploymentsEmptyState
            listDeployAvailability={availability?.listDeploy}
          />
        )}
      </Box>
    </>
  );
};

export default memo(HomePage);
