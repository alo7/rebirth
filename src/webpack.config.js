const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;
const corePath = path.join(__dirname, 'chrome-extension');

module.exports = {
  mode: env,
  entry: {
    'background': path.join(corePath, 'background.ts'),
    'content_script': path.join(corePath, 'content_script.ts'),
    'injected': path.join(corePath, 'injected.ts'),
  },
  watchOptions: {
    ignored: [ 'dist', 'node_modules', '.gitignore', '.eslintrc.js', 'README.md' ]
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER_URL: JSON.stringify('http://127.0.0.1'),
    })
  ],
  devtool: (env === 'production') ? 'none' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts' ]
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, 'extensions_dist')
  }
};
