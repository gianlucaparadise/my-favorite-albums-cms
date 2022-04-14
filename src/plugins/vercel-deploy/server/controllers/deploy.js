"use strict";

module.exports = {
  runDeploy(ctx) {
    ctx.body = strapi.plugin("vercel-deploy").service("deploy").runDeploy();
  },
  async getDeployments(ctx) {
    ctx.body = await strapi
      .plugin("vercel-deploy")
      .service("deploy")
      .getDeployments();
  },
  deployAvailability(ctx) {
    ctx.body = strapi
      .plugin("vercel-deploy")
      .service("deploy")
      .deployAvailability();
  },
};
