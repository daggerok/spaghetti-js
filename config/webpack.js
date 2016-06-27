/**
 * Created by mak on 6/25/16.
 */
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const Path = require('path');

module.exports = {
  modulesDirectories: [
    'node_modules'
  ],
  devtool: '#cheap-module-inline-source-map',
  entry: {
    app: [
      'babel-polyfill',
      './src/app.js'
    ]
    /*
    ,vendors: [
      'angular',
      'angular-ui-router',
      'angular-animate',
      'angular-sanitize',
      'satellizer',
      'ng-toast'
    ]
    */
  },
  output: {
    path: './dist',
    filename: '[name].js',
    publicPath: "./",
    sourceMapFilename: 'maps/[file].map'
  },
  resolve: {
    extensions: [
      '',
      '.es6',
      '.js'
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.(es6)$/,
        include: './src',
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        include: './src',
        exclude: /node_modules/,
        loader: 'jshint-loader'
      },
      {
        test: /\.js$/,
        include: './src',
        exclude: /node_modules/,
        loader: 'source-map-loader'
      }
    ],
    loaders: [
      {
        test: /\.(js|es6)$/,
        // exclude: /node_modules/,
        include: [
          Path.resolve(process.cwd(), 'src')
        ],
        loader: 'babel-loader',
        query: {
          presets: [
            'babel-preset-es2015'
          ]
        }
      },
      {
        test: /\.tpl.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/, // comment exclusion out if you are importing bootstrap...
        loader: ExtractPlugin.extract('style-loader', 'css-loader?importloader=1', 'postcss-loader')
      },
      {
        test: /\.scss$/,
        // exclude: /node_modules/,
        include: [
          Path.resolve(process.cwd(), 'src')
        ],
        loader: ExtractPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
      },
      {
        test: /\.less$/,
        // exclude: /node_modules/,
        include: [
          Path.resolve(process.cwd(), 'src')
        ],
        loader: ExtractPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        // exclude: /node_modules/,
        include: [
          Path.resolve(process.cwd(), 'src')
        ],
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        // exclude: /node_modules/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2)$/,
        // exclude: /node_modules/,
        loader:'url-loader?prefix=font/&limit=8192'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        // exclude: /node_modules/,
        loader: 'url-loader?limit=8192&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        // exclude: /node_modules/,
        loader: 'url-loader?limit=8192&mimetype=image/svg+xml'
      }
    ]
  },
  postcss: function () {
    return [
      precss,
      autoprefixer
    ];
  },
  plugins: [
    new ExtractPlugin('app.css'),
    new CopyPlugin([
      /*
      // angular
      {from: './node_modules/angular/angular.min.js',
         to: './vendors/angular'},
      {from: './node_modules/angular-ui-router/release/angular-ui-router.min.js',
         to: './vendors/angular'},

      // toast
      {from: './node_modules/angular-animate/angular-animate.min.js',
              to: './vendors/angular/toast'},
      {from: './node_modules/angular-sanitize/angular-sanitize.min.js',
              to: './vendors/angular/toast'},
      {from: './node_modules/ng-toast/dist/ngToast.min.js',
              to: './vendors/angular/toast'},
      {from: './node_modules/ng-toast/dist/ngToast.min.css',
              to: './vendors/angular/toast'},
      {from: './node_modules/ng-toast/dist/ngToast-animations.min.css',
              to: './vendors/angular/toast'},

      // bootstrap
      {from: './node_modules/bootstrap/dist/css/bootstrap.min.css',
              to: './vendors/bootstrap'},
      {from: './node_modules/bootstrap/dist/fonts',
              to: './vendors/bootstrap/fonts'},
      */
      // app
      {from: './src/images', to: './'}
    ])
  ],
  /*
  externals: {
    'angular': 'angular',
    'angular-ui-router': 'angular-ui-router',
    'angular-animate': 'angular-animate',
    'angular-sanitize': 'angular-sanitize',
    'satellizer': 'satellizer',
    'ng-toast': 'ng-toast'
  },
  */
  node:{
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
