/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from "react";

import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { Button } from "@strapi/design-system/Button";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Flex } from "@strapi/design-system/Flex";

import DeployErrorMessage from "../../components/DeployErrorMessage";
import DeploymentsContainer from "../../components/DeploymentsContainer";
import { deployAvailability, runDeploy } from "../../utils/api";

/**
 * @typedef {import('../../../../types/typedefs').DeployAvailability} DeployAvailability
 */

const HomePage = () => {
  /** @type {DeployAvailability} */
  const initialAvailability = {};
  const [availability, setAvailability] = useState(initialAvailability);

  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);

  useEffect(() => {
    deployAvailability()
      .then((response) => {
        setAvailability(response.data);
      })
      .catch((error) => {
        console.error(
          "[vercel-deploy] error while retrieving availability",
          error
        );
        setAvailability({});
      })
      .finally(() => {
        setIsLoadingAvailability(false);
      });
  }, [setIsLoadingAvailability, setAvailability]);

  const canDeploy = availability?.runDeploy == "AVAILABLE";

  const runDeployHandler = async () => {
    const response = await runDeploy();
    console.log("deploy response", response);
  };

  if (isLoadingAvailability) {
    return <LoadingIndicatorPage />;
  }

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
        <DeploymentsContainer />
      </Box>
    </>
  );
};

export default memo(HomePage);
