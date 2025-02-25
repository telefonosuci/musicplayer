const CopyWebpackPlugin = require("copy-webpack-plugin");
const {  dest, src } = require("./rootPath");



console.log("Coping assets from: ", src, " to: ", dest);

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: src,
          to: dest,
        },
      ],
    }),
  ],
};
