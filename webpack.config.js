var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = {
  devtool: 'source-map',
  entry: {},
  resolve: {
    extensions: ['.ts', '.js', '.less', '.css']
  },
  module: {
    rules: [
       {
         test: /\.ts$/,
         exclude: [/app\/lib/, /node_modules/],
         use: [
           'ng-annotate-loader',
           'awesome-typescript-loader'
         ]
       },
       { test: /\.html$/, use: 'raw-loader' },
       {
         test: /\.less$/,
         use: ['style-loader', 'css-loader', 'less-loader']
       },
       { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      hash: true
    }),
    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
