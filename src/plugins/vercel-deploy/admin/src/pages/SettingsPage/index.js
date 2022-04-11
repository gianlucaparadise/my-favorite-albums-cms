/*
 *
 * SettingsPage
 *
 */

import React, { memo, useEffect, useState } from "react";

import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { Stack } from "@strapi/design-system/Stack";
import { Field, FieldLabel, FieldInput } from "@strapi/design-system/Field";
import { Link } from "@strapi/design-system/Link";
import { Typography } from "@strapi/design-system/Typography";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";

import { getConfig } from "../../utils/api";


const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pluginConfig, setPluginConfig] = useState(initialConfig);

  useEffect(() => {
    getConfig()
      .then((response) => {
        setIsLoading(false);
        setPluginConfig(response.data);
      })
      .catch((error) => {
        console.error(
          "vercel-deploy: error in settings page while retrieving plugin config",
          error
        );
        setIsLoading(false);
        setPluginConfig({});
      });
  }, [setIsLoading, setPluginConfig]);

  const getDeployHook = () => pluginConfig.deployHook || "";

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout
          title="Configuration"
          subtitle="Configure your Vercel Deploy plugin"
          as="h2"
        />
      </Box>
      <Box padding={8}>
        <Field name="vercel-deploy-hook">
          <Stack spacing={1}>
            <FieldLabel required>Deploy Hook</FieldLabel>
            <FieldInput
              type="text"
              placeholder="Type here your deploy hook"
              value={getDeployHook()}
              disabled={true}
            />
            <Box>
              <Typography variant="pi">Learn more about </Typography>
              <Link isExternal href="https://vercel.com/docs/git/deploy-hooks">
                Vercel Deploy Hooks
              </Link>
            </Box>
          </Stack>
        </Field>
      </Box>
    </>
  );
};

export default memo(SettingsPage);
