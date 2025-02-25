const path = require("path");
const rootPath = require("./rootPath").root;

console.log("ROOT ALIAS: ", rootPath);
module.exports = {
  "@": path.join(rootPath, "/src"),
  "@App": path.join(rootPath, "/app"),
};
