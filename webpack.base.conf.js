const path = require("path");
const MiniCssExtraPlugin = require("mini-css-extract-plugin");
const CopyWebPackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')


const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./public"),
  assets: "assets/",
};


module.exports = {
  externals: {
    paths: PATHS,
  },

  entry: {
    app: PATHS.src,
  },
  output: {
    path: PATHS.dist,
    publicPath: "/",
    filename: `${PATHS.assets}js/[name].js`,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loader: {
            scss: "vue-style-loader!css-loader!sass-loader",
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(png|jpg|gif|svg')$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          //MiniCssExtraPlugin.loader,
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
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          //MiniCssExtraPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },

          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.js",
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtraPlugin({
      filename: `${PATHS.assets}css/[name].css`,
      // chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: "./index.html",
    }),
    new CopyWebPackPlugin({
      patterns: [
        { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
        // { from: `${PATHS.src}/static`, to: '' }
      ],
    }),
  ],
};
