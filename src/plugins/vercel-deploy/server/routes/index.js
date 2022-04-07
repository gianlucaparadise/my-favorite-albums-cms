module.exports = [
  {
    method: "GET",
    path: "/run-deploy",
    handler: "deploy.runDeploy",
    config: {
      policies: [],
    },
  },
];
