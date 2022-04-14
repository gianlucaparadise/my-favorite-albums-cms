// TODO: rename /run-deploy with /deploy/run
module.exports = [
  {
    method: "GET",
    path: "/run-deploy",
    handler: "deploy.runDeploy",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/config",
    handler: "config.getConfig",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/deploy/list",
    handler: "deploy.getDeployments",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/deploy/availability",
    handler: "deploy.deployAvailability",
    config: {
      policies: [],
    },
  },
];
