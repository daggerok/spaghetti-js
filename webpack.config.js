const { resolve } = require('path');
const pathTo = rel => resolve(process.cwd(), rel);

const { version } = require('./package.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({

  entry: './src/main.js',

  output: {
    path: pathTo('./dist'),
    filename: `[name].js?v=${version}`,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              exportLoaders: 1,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [
      '.js',
      '.css',
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  devtool: 'cheap-module-source-map',

  devServer: {
    port: 8000,
    stats: 'minimal',
    historyApiFallback: true,
    contentBase: pathTo('./src'),
  },
});
