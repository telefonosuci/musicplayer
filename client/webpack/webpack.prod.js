const scss = require("./scss");
const entry = require("./entries").entry;
const aliases = require("./aliases");
const copyAssets = require('./copyAssets');
const { dest } = require("./rootPath");

console.log("Webpack entries: ", entry);

module.exports = {
  watch: false,
  mode: "production",
  entry: entry,
    output: {
      path: dest,
      filename: "[name]-bundle.js",
    },
    resolve: {
      alias: aliases,
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // Supporto per file JS e JSX
          exclude: /node_modules/, // Esclude la trasformazione dei moduli di terze parti
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env", // Transpiling per ES6+
                "@babel/preset-react", // Supporto per JSX e React
              ],
            },
          },
        },
        /*
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader", "eslint-loader"],
          },
          */
        {
          test: /\.css$/,
          exclude: /node_modules/, // Remove this
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },

        //scss.rule,
          /*
          {
            test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
            options: 'url-loader?limit=100000'
          },
          */
        /*
           {
             test: /\.(woff(2)?|ttf|eot|jpg|jpeg|png|)(\?v=\d+\.\d+\.\d+)?$/,
             use: [
               {
                 loader: 'file-loader'
               }
             ]
           }
           */
      ],
    },
    plugins: [
      /*...scss.plugins, ...copyAssets.plugins ...html.plugins*/
    ],
};
