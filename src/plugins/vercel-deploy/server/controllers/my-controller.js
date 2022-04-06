'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('vercel-deploy')
      .service('myService')
      .getWelcomeMessage();
  },
};
