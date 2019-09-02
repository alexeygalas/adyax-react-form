const isProduction = 'production' === process.env.NODE_ENV;

const path = require('path');
const UglifyJSPlugin = require('uglify-js-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('@babel/register');

let conf = {
  mode: 'development',
  entry: { app: './src/index.js' },
  output: {
    filename: './assets/bundle.[name].js',
    sourceMapFilename: './assets/[name].js.map',
    chunkFilename: './assets/[name].js',
    path: path.join(__dirname, 'build')
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
      filename: './assets/style.css'
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      hash: true
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets/images/',
        to: './assets/images'
      },
      {
        from: './public/*.ico',
        to: './assets/images',
        flatten: true
      }
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|svg|ico)$/,
        include: [ path.resolve(__dirname, 'src/assets/images') ],
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]',
              outputPath: './assets/images'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        include: path.resolve(__dirname, 'src/assets/fonts'),
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]',
              outputPath: './assets/fonts'
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
    inline: true
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
