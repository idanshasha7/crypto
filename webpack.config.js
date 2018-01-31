const webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:  './src/index.js',
    output: {
        path:  __dirname,
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx','css']
    },
    externals: ['axios'],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
            test: /\.(png|jpg|gif)$/,
            loader: "file-loader?name=img/img-[hash:6].[ext]"
          },
          {
                  // The important stuff
                  test: /\.(jpg|jpeg|png)(\?.*)?$/, // Load only .jpg .jpeg, and .png files
                  use: {
                    loader: 'file-loader',
                    options: {
                      name: '[name][md5:hash].[ext]', // Name of bundled asset
                      outputPath: 'assets/', // Output location for assets. Final: `app/assets/webpack/webpack-assets/`
                      publicPath: '/assets/' // Endpoint asset can be found at on Rails server
                    }
                  }
                }


        ]
    },
    devServer: {
       historyApiFallback: true,
       contentBase: './crypto/',
       hot: true
     },
  //   devServer: {
  //     historyApiFallback: true,
  //     // contentBase: path.resolve('public'),
  //     // publicPath: '/public',
  //   //   proxy: {
  //   //     '/*': {
  //   //      target: 'http://localhost:[port]/',
  //   //      pathRewrite: { '^/': '' },
  //   //    },
  //   //  },
  //  },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: 'body'
    })]
}
