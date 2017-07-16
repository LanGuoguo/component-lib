const path = require("path");

module.exports = {
  entry: [
    "./lib/index.ts"
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"]
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js",
    library: {
      root: "ComponentLib",
      amd: "component-lib",
      commonjs: "componnet-lib"
    },
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.ts?x$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "awesome-typescript-loader"
          }
        ],
      }
    ],
  },
};
