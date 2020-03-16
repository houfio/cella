const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    })
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
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: resolve(__dirname, '.babelrc.json')
            }
          },
          {
            loader: '@svgr/webpack',
            options: {
              template: ({ template }, options, { componentName, props, jsx, exports }) => template.ast`
                import { Part } from '../../../../../src/Part';
                import { html } from '../../../../../src/utils/html';
                export class ${componentName} extends Part {
                  render() {
                    const ${props} = this.props;
                    
                    return ${jsx};
                  }
                }
                ${exports}
              `,
              babel: false
            }
          }
        ]
      }
    ]
  },
  devServer: {
    inline: true,
    historyApiFallback: true
  }
};
