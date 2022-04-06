module.exports = [
  {
    method: "GET",
    path: "/content-types",
    handler: "deploy.findContentTypes",
    config: {
      policies: [],
    },
  },
];
