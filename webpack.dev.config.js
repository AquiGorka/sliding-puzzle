let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let PORT = 8080;
let dir = 'build-dev/';

module.exports = {
  contentBase: dir,
  devtool: 'eval',
  port: PORT,
  entry: [
    'webpack-dev-server/client?http://localhost:' + PORT,
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, dir),
    filename: 'js/index.js',
    publicPath: ''
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot','babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!stylus-loader')
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin( 'css/styles.css', { allChunks: false }),
    new HtmlWebpackPlugin({ template: './src/template/index.html', inject: false })
  ]
};

