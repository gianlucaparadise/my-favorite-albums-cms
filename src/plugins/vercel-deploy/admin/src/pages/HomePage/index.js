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
        setIsLoadingAvailability(false);
        setAvailability(response.data);
      })
      .catch((error) => {
        console.error(
          "[vercel-deploy] error while retrieving availability",
          error
        );
        setIsLoading(false);
        setAvailability({});
      });
  }, [setIsLoadingAvailability, setAvailability]);

  const getCanDeploy = () => availability?.runDeploy == "AVAILABLE";

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
        <Button onClick={runDeployHandler} disabled={!getCanDeploy()}>
          Deploy
        </Button>
      </Box>
    </>
  );
};

export default memo(HomePage);
