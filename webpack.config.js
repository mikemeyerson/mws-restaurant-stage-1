const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './js/main.js',
    details: './js/restaurant_info.js',
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    port: 8000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/index.html',
      filename: '../index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './templates/restaurant.html',
      filename: '../restaurant.html',
      chunks: ['details'],
    }),
  ],
};
