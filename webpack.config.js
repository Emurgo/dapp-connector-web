const CopyWebpackPlugin = require("copy-webpack-plugin");
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const path = require('path');

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
  plugins: [new CopyWebpackPlugin(["index.html", "favicon.ico"]),
  new FilterWarningsPlugin({
    exclude: [/Critical dependency/]
  })],
  experiments: { syncWebAssembly: true },
  devServer: {
    host: "0.0.0.0",
    allowedHosts: "all",
    hot: true,
    port: 443,
  },
};
