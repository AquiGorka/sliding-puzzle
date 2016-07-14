let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let dir = 'build-prod';

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, dir),
    filename: 'js/index.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!stylus-loader')
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    new ExtractTextPlugin( 'css/styles.css', {allChunks: false }),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new HtmlWebpackPlugin({ template: 'src/template/index.html', inject: false })
  ]
};
