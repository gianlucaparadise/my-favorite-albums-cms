"use strict";

module.exports = {
  runDeploy(ctx) {
    ctx.body = strapi.plugin("vercel-deploy").service("deploy").runDeploy();
  },
};
