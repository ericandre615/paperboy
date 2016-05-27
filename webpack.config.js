var webpack = require('webpack');

module.exports = {
  entry: {
    app: ["./index.js"]
  },
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: "paperboy.min.js",
    publicPath:"/",
    libraaryTarget: "var",
    library: "paperboy"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
