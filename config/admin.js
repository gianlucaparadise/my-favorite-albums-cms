module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '7105a5b965ee8f4e062d8d85eb3179e7'),
  },
});
