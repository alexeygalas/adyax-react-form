const isProduction = 'production' === process.env.NODE_ENV;

const path = require('path');
const UglifyJSPlugin = require('uglify-js-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('@babel/register');

let conf = {
  mode: 'development',
  entry: {
    app: './src/index.js',
    style: './src/style.scss'
  },
  output: {
    filename: 'bundle.[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[name].js',
    path: path.join(__dirname, './assets')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -20,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true
    }),
    new CopyWebpackPlugin([
      { test: /\.svg$/, from: './src/images/' }
    ])
  ],
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        include: path.resolve(__dirname, 'src/images'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css',
      '.scss'
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    disableHostCheck: true,
    port: 3000,
    open: true,
    inline: true,
    proxy: {
      context: ['/api/**'],
      target: 'http://5d6774fe6847d40014f65fec.mockapi.io',
      secure: false
    }
  },
};

if (isProduction) {
  conf.mode = 'production'
  conf.devtool = undefined
  conf.optimization.minimizer = [
    new UglifyJSPlugin({
      sourceMap: false,
      uglifyOptions: {
        compress: {
          inline: false
        }
      }
    })
  ]
}

module.exports = conf;
