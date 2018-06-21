const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob-all')
const autoprefixer = require('autoprefixer');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

module.exports = env => {


  const isProd = env === 'production';

  const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
  const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      {
        loader: 'postcss-loader',
          options: {
            plugins: [
              autoprefixer({
                browsers:['ie >= 8', 'last 4 version']
              })
            ],
          sourceMap: true
        }
      },
      'sass-loader'
    ],
    publicPath: '../'
  });

  const cssConfig = isProd ? cssProd : cssDev;
  const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

  return {
    entry: {
      bootstrap: bootstrapConfig,
      app: './src/js/app.js',
    },
    output: {
      path: PATHS.dist,
      filename: './js/[name].bundle.js'
    },
    resolve: {
      modules: ['node_modules']
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(sass||scss||less)$/,
          use: cssConfig
        },
        {
          test: /\.(less)$/,
          use: 'less-loader'
        },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: 'script-loader'
        // },
        {
          test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
          use: "imports?this=>window"
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: [
            'file-loader?name=images/[name].[ext]',
            'image-webpack-loader'
          ]
        },
        {
          test: /\.(woff2?)$/,
          use: 'url-loader?limit=10000&name=[name].[ext]&outputPath=fonts/'
        },
        {
          test: /\.(ttf|eot|svg)$/,
          use: 'file-loader?name=[name].[ext]&outputPath=fonts/'
        },
        {
          test: /\.ico$/,
          use: 'file-loader?name=[name].[ext]&outputPath=images/favicons'
        },
        {
          test: /\facions\.png$/,
          use: 'file-loader?name=[name].[ext]&outputPath=images/'
        },
        { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' }
      ]
    },
    devServer: {
      contentBase: PATHS.dist,
      compress: true,
      host: '192.168.1.107',
      stats: 'errors-only',
      open: false,
      hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist/*']),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        "window.jQuery": "jquery",
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        title: "Atelier",
        template: "./src/index.html",
        favicon: "src/images/favicons/favicon.ico",
        excludeChunks: ['gallery'],
        minify: {
          collapseWhitespace: false
        },
        hash: true,
        chunks: ['bootstrap', 'app'],
        chunksSortMode: 'manual'
      }),
      new ExtractTextPlugin({
        filename: 'css/[name][hash:6].css',
        disable: !isProd,
        allChunks: true
      }),
      new PurifyCSSPlugin({
        paths: glob.sync([
          path.join(__dirname, 'src/index.html'),
          path.join(__dirname, 'node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js'),
          path.join(__dirname, 'src/js/unitegallery.js')
        ]),
        minimize: true

      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
