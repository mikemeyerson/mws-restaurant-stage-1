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
      { test: /\.js$/, exclude: '/node_modules/', use: { loader: 'babel-loader' } },
    ],
  },
};
