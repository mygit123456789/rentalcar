// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require("path");
module.exports = {
  context: __dirname,
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
    modules: [
      "node_modules",
      path.resolve(__dirname, "./"),
      "server",
      path.resolve(__dirname, "./"),
      "public",
      path.resolve(__dirname, "client"),
      "сomponents"
    ]
  },
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, "../node_modules"),
        query: {

        presets: ['es2015', 'stage-0', 'react'],
      }
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap&-minimize"
        ]
      }
    ],
  },
};
