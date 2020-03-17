const { MONGO_DEV_PASSWORD } = process.env;
const { SECRET_OR_KEY } = process.env;

module.exports = {
  mongoURI: `mongodb://admin:${MONGO_DEV_PASSWORD}@ds223756.mlab.com:23756/tear-db-dev-prim`,
  secretOrKey: SECRET_OR_KEY
};
