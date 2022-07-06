import * as HtmlWebPackPlugin from "html-webpack-plugin";
import { container } from "webpack";
import { dependencies } from "./package.json";

const { ModuleFederationPlugin } = container;

export default {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "react_app_mfe_boilerplate", //add your app name here
      filename: "remoteEntry.js", // naming convention specifies your filename to be remoteEntry.js
      remotes: {}, // remotes that your app will consume eg: remoteName: remoteName@http://localhost:8081/remoteEntry.js
      exposes: {
        "./App": "./src/App", // App exposed by your MFE
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
