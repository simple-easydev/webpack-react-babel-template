const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
    devtool: "devtool: 'source-map'",
    mode: "development",
    entry: ["babel-polyfill", "./src/index.js"],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', 'html']
    },
    devServer: {
		historyApiFallback: true,
        // https: true,
        contentBase:"./public",
		port: "8080",
	},
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/react", "@babel/env"]
            }
          }
        },
        {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
        },
        {
            test: /\.scss|css$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            mode: 'local',
                            context: path.resolve(__dirname, 'src'),
                            localIdentName: "[local]--[hash:base64:5]"
                          }
                    }
                },
                "sass-loader"
            ]
        },
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "public/index.html",
          filename: "index.html",

        }),
    ]
  };