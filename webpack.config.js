const webpack = require("webpack"),
  path = require("path"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  WriteFilePlugin = require("write-file-webpack-plugin");

var fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2"
];

const manifestEnvironment = process.env.NODE_ENV || "staging";
var environment = {
  mode:
    process.env.NODE_ENV === "staging" ? "development" : process.env.NODE_ENV,
  entry: {
    index: path.join(__dirname, "src", "js", "index.js"),
    popup: path.join(__dirname, "src", "js", "popup.js"),
    background: path.join(__dirname, "src", "js", "background.js"),
    content: path.join(__dirname, "src", "js", "content.js"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          //MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: fileExtensions
      .map(extension => "." + extension)
      .concat([".jsx", ".js", ".css"])
  },
  plugins: [
    // clean the build folder
    // new CleanWebpackPlugin(["build"]),
    new CopyWebpackPlugin([
      {
        from: `src/manifest_${manifestEnvironment}.json`,
        to: "manifest.json",
        toType: "file",
        transform: function(content, path) {
          // generates the manifest file using the package.json informations
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString())
            })
          );
        }
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: `src/img/${manifestEnvironment}`,
        toType: "dir"
      }
    ]),
    new HtmlWebpackPlugin({
      template:
        process.env.NODE_ENV === "production"
          ? path.join(__dirname, "src", "popup.html.production")
          : path.join(__dirname, "src", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"]
    }),
    new WriteFilePlugin()
  ]
};

if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "staging"
) {
  environment.devtool = "cheap-module-eval-source-map";
}

module.exports = environment;
