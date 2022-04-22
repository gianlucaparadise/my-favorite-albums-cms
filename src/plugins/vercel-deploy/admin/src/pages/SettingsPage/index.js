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

import DeploymentsEmptyState from "../../components/DeploymentsEmptyState";
import { getConfig } from "../../utils/api";

/**
 * @typedef {import('../../../../types/typedefs').PluginConfigMap} PluginConfigMap
 */

const BoxField = ({ fieldName, children }) => {
  const horizontalPadding = 6;
  const verticalPadding = 2;
  return (
    <Box
      paddingLeft={horizontalPadding}
      paddingRight={horizontalPadding}
      paddingTop={verticalPadding}
      paddingBottom={verticalPadding}
    >
      <Field name={fieldName}>{children}</Field>
    </Box>
  );
};

const SettingsPage = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /** @type {PluginConfigMap} */
  const initialConfig = {};
  const [pluginConfig, setPluginConfig] = useState(initialConfig);

  useEffect(() => {
    getConfig()
      .then((response) => {
        setPluginConfig(response.data);
      })
      .catch((error) => {
        console.error(
          "[vercel-deploy] error while retrieving plugin config",
          error
        );
        setPluginConfig({});
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading, setPluginConfig]);

  const deployHook = pluginConfig.deployHook || "";
  const apiToken = pluginConfig.apiToken || "";
  const appFilter = pluginConfig.appFilter || "";

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  if (hasError) {
    return (
      <Box padding={8} background="neutral100">
        <DeploymentsEmptyState type="ERROR_CONFIG" />
      </Box>
    );
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
      <BoxField fieldName="vercel-deploy-hook">
        <Stack>
          <FieldLabel required>Deploy Hook</FieldLabel>
          <FieldInput
            type="text"
            placeholder="You need to set the VERCEL_DEPLOY_PLUGIN_HOOK environment variable"
            value={deployHook}
            disabled={true}
          />
          <Box>
            <Typography variant="pi">
              {"Learn more about "}
              <Link isExternal href="https://vercel.com/docs/git/deploy-hooks">
                Vercel Deploy Hooks
              </Link>
            </Typography>
          </Box>
        </Stack>
      </BoxField>
      <BoxField fieldName="vercel-deploy-api-token">
        <Stack>
          <FieldLabel required>API token</FieldLabel>
          <FieldInput
            type="text"
            placeholder="You need to set the VERCEL_DEPLOY_PLUGIN_API_TOKEN environment variable"
            value={apiToken}
            disabled={true}
          />
          <Box>
            <Typography variant="pi">
              {"Access tokens can be created and managed inside your "}
              <Link isExternal href="https://vercel.com/account/tokens">
                account settings
              </Link>
            </Typography>
          </Box>
        </Stack>
      </BoxField>
      <BoxField fieldName="vercel-deploy-app-name">
        <Stack>
          <FieldLabel>App Name</FieldLabel>
          <FieldInput
            type="text"
            placeholder="You need to set the VERCEL_DEPLOY_PLUGIN_APP_FILTER environment variable"
            value={appFilter}
            disabled={true}
          />
          <Box>
            <Typography variant="pi">
              {"Set the name of your "}
              <Link isExternal href="https://vercel.com/dashboard">
                Vercel App
              </Link>
              {" to see only the deployments you need"}
            </Typography>
          </Box>
        </Stack>
      </BoxField>
    </>
  );
};

export default memo(SettingsPage);
