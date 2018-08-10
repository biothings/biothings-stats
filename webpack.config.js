const path = require('path');
let webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './app/app.js',
    output: {
      path: path.resolve(__dirname, 'static/'),
      filename: "./js/[name].js",
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },{
            test: /\.scss$/,
            use:ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use:['css-loader','sass-loader'],
              publicPath:'static/css/'
            })
         }]
    },
    plugins:[
      new ExtractTextPlugin({
        filename: "./css/[name].css",
        disable: false,
        allChunks: true
      })
    ],
    devtool: "eval-source-map"
};
