const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle2.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: "/js",
    port: 9000,
    historyApiFallback: true
  }
};
