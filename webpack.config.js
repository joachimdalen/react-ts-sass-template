const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTML_OPTIONS = {
  template: "./index.html",
  minify: {
    collapseWhitespace: true,
    removeAttributeQuotes: true
  }
};
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            "sass-loader"
          ]
        })
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(HTML_OPTIONS),
    new ExtractTextPlugin("style.css"),
    new CleanWebpackPlugin(["build"])
  ],
  devServer: {
    port: 8080,
    contentBase: "./",
    historyApiFallback: true
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
};
