"use strict";

module.exports = {
  runDeploy(ctx) {
    ctx.body = strapi.plugin("vercel-deploy").service("deploy").runDeploy();
  },
  deployAvailability(ctx) {
    ctx.body = strapi
      .plugin("vercel-deploy")
      .service("deploy")
      .deployAvailability();
  },
};
