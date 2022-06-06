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
  plugins: [
    new CopyWebpackPlugin(['index.html', 'favicon.ico']),
    new FilterWarningsPlugin({
      exclude: [/Critical dependency/]
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.wasm'],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer'),
    },
  },

  experiments: { syncWebAssembly: true }

};
