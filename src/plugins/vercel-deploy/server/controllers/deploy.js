"use strict";

module.exports = {
  findContentTypes(ctx) {
    ctx.body = strapi
      .plugin("vercel-deploy")
      .service("deploy")
      .getContentTypes();
  },
};
