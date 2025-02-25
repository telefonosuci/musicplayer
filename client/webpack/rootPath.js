const path = require("path");
const root =  path.join(__dirname, "..");



console.log("ROOT: ", root);
module.exports = {
  root,
  src: path.join(root, "/src/assets"),
  dest: path.join(root, "../assets"),
  templatesSrcDir: path.join(__dirname, "/templates"),
  templatesOutputDir: path.join(root, "..", "/snippets"),
};
