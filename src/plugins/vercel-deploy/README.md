# Strapi plugin vercel-deploy

This plugin helps you trigger the deploy of a website hosted on Vercel.

## Environment Conifg

In order to use the plugin, you need to set the following environment variables:

- `VERCEL_DEPLOY_PLUGIN_HOOK`: Url of the git deploy hook exposed in Vercel.
  - You can follow [this](https://vercel.com/docs/git/deploy-hooks) guide to create a deploy hook on Vercel
  - Then you can save the hook url as process env variable (e.g. [this](https://devcenter.heroku.com/articles/config-vars) guide is for Heroku)
