const path = require("path");

const { templatesSrcDir, templatesOutputDir } = require("./rootPath");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(templatesSrcDir, 'include_javascripts.liquid'), // Usa un template esistente
      filename: path.resolve(templatesOutputDir, "include_javascript.liquid"),       // Nome del file generato in /dist
    }),
  ],
};
