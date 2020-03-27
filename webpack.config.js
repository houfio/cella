const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new FaviconsWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets'
        }
      }
    ]
  },
  devServer: {
    inline: true,
    historyApiFallback: true
  }
};
