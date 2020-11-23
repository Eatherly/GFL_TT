const path = require('path')
const MiniCssExtraPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: {
    app: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtraPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtraPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },

          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
              
            },
          },
        ],
      },
    ],
  },
  devServer: {
    overlay: true,
  },
  plugins: [
    new MiniCssExtraPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
