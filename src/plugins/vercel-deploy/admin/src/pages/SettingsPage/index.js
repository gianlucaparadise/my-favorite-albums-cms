/*
 *
 * SettingsPage
 *
 */

import React, { memo } from "react";

import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { Stack } from "@strapi/design-system/Stack";
import { Field, FieldLabel, FieldInput } from "@strapi/design-system/Field";
import { Link } from "@strapi/design-system/Link";
import { Typography } from "@strapi/design-system/Typography";

const SettingsPage = () => {
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
              value={""}
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
