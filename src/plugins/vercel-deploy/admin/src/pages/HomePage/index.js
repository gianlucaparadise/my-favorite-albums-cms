/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";

import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { Button } from "@strapi/design-system/Button";

import { runDeploy } from "../../utils/api";

const HomePage = () => {
  const runDeployHandler = async () => {
    const response = await runDeploy();
    console.log("deploy response", response);
  };

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
        <Button onClick={runDeployHandler}>Deploy</Button>
      </Box>
    </>
  );
};

export default memo(HomePage);
