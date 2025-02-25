

module.exports = (env) => {
  if (env.mode === 'prod' || env.mode === 'dev') {
    const config = require('./client/webpack/webpack.' + env.mode + '.js');
    return config;
  } else {
    console.log("Wrong webpack build parameter. Possible choices: 'dev', 'prod'.")
  }
};
