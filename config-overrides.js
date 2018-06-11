const path = require('path')
const rewireEslint = require('react-app-rewire-eslint')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  webpack (config, env) {
    config = rewireEslint(config, env)

    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './public/features/index.html'),
      filename: 'features/index.html'
    }))

    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './public/media-kit/index.html'),
      filename: 'media-kit/index.html'
    }))

    return config
  }
}
