/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from "react";

import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Box } from "@strapi/design-system/Box";
import { BaseHeaderLayout } from "@strapi/design-system/Layout";

import { fetchContentTypes } from "../../utils/api";
import ContentTypesTable from "../../components/ContentTypesTable";

const HomePage = () => {
  const [contentTypes, setContentTypes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const myContentTypes = await fetchContentTypes();

    setContentTypes(myContentTypes);
    setIsLoading(false);
  }, [setContentTypes, setIsLoading]);

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout
          title="SEO"
          subtitle="Optimize your content to be SEO friendly"
          as="h2"
        />
      </Box>

      <ContentTypesTable contentTypes={contentTypes} />
    </>
  );
};

export default memo(HomePage);
