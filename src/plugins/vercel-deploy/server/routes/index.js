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
    path: "/deploy/availability",
    handler: "deploy.deployAvailability",
    config: {
      policies: [],
    },
  },
];
