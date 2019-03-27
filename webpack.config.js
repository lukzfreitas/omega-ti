const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const time = new Date().getTime();

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: 'index.html'
});

module.exports = {
  entry: './js/app.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: './img/[name]-[hash].[ext]'
          }
        }]
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    htmlPlugin,
    new ExtractTextPlugin({
      filename: `app.bundle.${time}.css`
    }),
    new CopyWebpackPlugin(['**/*.pdf', '**/*.mp4'])
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name].bundle.${time}.js`
  },
  devServer: {
    inline: true,
    open: true,
    port: process.env.PORT || 8080,
    contentBase: './dist',
    disableHostCheck: true
  }
};
