var Encore = require('@symfony/webpack-encore');

Encore
// directory where compiled assets will be stored
  .setOutputPath('./dist/')
  // public path used by the web server to access the output path
  .setPublicPath('/dist')
  // only needed for CDN's or sub-directory deploy
  //.setManifestKeyPrefix('build/')

  /*
   * ENTRY CONFIG
   *
   * Add 1 entry for each "page" of your app
   * (including one that's included on every page - e.g. "app")
   *
   * Each entry will result in one JavaScript file (e.g. app.js)
   * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
   */
  .addEntry('app', './src/index.js')
  //.addEntry('page1', './assets/js/page1.js')
  //.addEntry('page2', './assets/js/page2.js')

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .enableSingleRuntimeChunk()

  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(Encore.isProduction())

  // uncomment if you use TypeScript
  //.enableTypeScriptLoader()

  // uncomment if you use Sass/SCSS files
  .enableSassLoader()

  // Enables PostCSS
  // https://symfony.com/doc/current/frontend/encore/postcss.html
  .enablePostCssLoader()



// uncomment if you're having problems with a jQuery plugin
//.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();


// const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//
// const devMode = process.env.NODE_ENV !== 'production';
//
// module.exports = {
//
//   mode: devMode ? "development" : "production",
//
//   entry: {
//     app: './src/index.js'
//   },
//   optimization: {
//     minimizer: [
//       new UglifyJsPlugin({
//         cache: true,
//         parallel: true,
//         sourceMap: true // set to true if you want JS source maps
//       }),
//       new OptimizeCSSAssetsPlugin({})
//     ],
//     // splitChunks: {
//     //   cacheGroups: {
//     //     styles: {
//     //       name: 'styles',
//     //       test: /\.s?css$/,
//     //       chunks: 'all',
//     //       enforce: true
//     //     }
//     //   }
//     // }
//   },
//   plugins: [
//     new CleanWebpackPlugin(['dist']),
//     new ManifestPlugin({
//       basePath: 'dist/',
//       publicPath: 'dist/',
//       writeToFileEmit: true
//     }),
//     new MiniCssExtractPlugin({
//       // Options similar to the same options in webpackOptions.output
//       // both options are optional
//       filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
//       chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
//     })
//   ],
//
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: "babel-loader"
//       },
//       {
//         test: /\.(sa|sc|c)ss$/,
//         use:  [
//           devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
//           'css-loader',
//           'postcss-loader',
//           'sass-loader',
//         ]
//       }
//     ]
//   },
//
//
//   output: {
//     filename: '[name].[chunkhash].js',
//     path: path.resolve(__dirname, 'dist')
//   }
// };
