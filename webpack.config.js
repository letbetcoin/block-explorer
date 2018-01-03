var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var outputPath = path.join(__dirname, 'dist')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var chalk = require('chalk')

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'src', 'app.js')],
  target: 'node',
  output: {
    path: outputPath,
    filename: 'server.js'
  },
  module: {
    rules: [{
      'test': /\.js$/,
      'loader': 'babel-loader',
      'include': [__dirname],
      'exclude': /node_modules/
    }]
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();'),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'public'),
      to: path.join(outputPath, 'public')
    }, {
      from: path.join(__dirname, 'views'),
      to: path.join(outputPath, 'views')
    }]),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' :msg - :elapsed seconds'
    })
  ]
}