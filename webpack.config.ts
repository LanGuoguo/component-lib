import * as webpack from "webpack";
import * as path from "path";

const config: webpack.Configuration = {
  entry: [
    "./lib/index.ts"
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"]
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js",
    library: "component-lib", // TODO fix library
    // library: {
    //   root: "ComponentLib",
    //   amd: "component-lib",
    //   commonjs: "componnet-lib"
    // },
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.ts?x$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "awesome-typescript-loader",
          }
        ],
      }
    ],
  },
};

export default config;
