import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const { ModuleFederationPlugin } = webpack.container;
import { webpack } from "webpack";
import { dependencies as deps } from "../package.json";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const config = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "build"),
    compress: true,
    port: 4000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cra-mfe-boilerplate", // Enter your module name here
      filename: "remoteEntry.js", // convention is to wirte file as remoteEntry.js
      exposes: {
        // expose each component
        "./demo": "./src/Demo.tsx",
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};

export default config;
