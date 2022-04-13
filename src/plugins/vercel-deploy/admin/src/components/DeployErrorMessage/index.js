/**
 *
 * DeployErrorMessage
 *
 */

import React from "react";
import { Typography } from "@strapi/design-system/Typography";

/**
 * @typedef {import('./typedefs').Props} Props
 * @typedef {import("./typedefs").RunDeployFeatureAvailability} RunDeployFeatureAvailability
 */

/**
 * @param {RunDeployFeatureAvailability} deployAvailability
 * @returns {string} Error message
 */
const getMessage = (deployAvailability) => {
  switch (deployAvailability) {
    case "MISSING_CONFIG_OBJECT":
      return "Unexpected config error: the config object is empty";

    case "MISSING_CONFIG_VARIABLE":
      return "Config error: You did not set the Vercel Deploy Hook. Go to Plugin settings for more info";

    default:
      return "Unexpected error";
  }
};

/**
 * Depending on the input status, display an error message
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DeployErrorMessage = ({ deployAvailability }) => {
  if (deployAvailability === "AVAILABLE") {
    return <></>;
  }

  return (
    <Typography textColor="danger500" variant="pi">
      {getMessage(deployAvailability)}
    </Typography>
  );
};

export default DeployErrorMessage;
