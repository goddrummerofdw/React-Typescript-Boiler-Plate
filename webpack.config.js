const path = require("path");
const openBrowser = require("react-dev-utils/openBrowser");
const HtmlWebbpackplugin = require("html-webpack-plugin")
module.exports = {
  mode: "development",
  entry: "./src/Client/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    new HtmlWebbpackplugin({
      inject: true,
      template: "public/index.html"
    })
  ],

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js",
    publicPath: '/'
  },

  stats: {
    children: true,
  },
  devServer: {
    port: "3000",
    static: ["./public"],
    hot: false,
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      const addr = devServer.server.address();
      openBrowser(`http://localhost:${addr.port}`);
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
};



