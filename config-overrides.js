const path = require('path')
const rewireEslint = require('react-app-rewire-eslint')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID

module.exports = {
  webpack (config, env) {
    config = rewireEslint(config, env)

    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './public/index.html'),
      filename: 'index.html',
      params: { gaTrackingId }
    }))

    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './public/features/index.html'),
      filename: 'features/index.html',
      params: { gaTrackingId }
    }))

    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './public/media-kit/index.html'),
      filename: 'media-kit/index.html',
      params: { gaTrackingId }
    }))

    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './public/apps/index.html'),
      filename: 'apps/index.html',
      params: { gaTrackingId }
    }))

    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './public/auction/index.html'),
      filename: 'auction/index.html',
      params: { gaTrackingId }
    }))

    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './public/dashboard/index.html'),
      filename: 'dashboard/index.html',
      params: { gaTrackingId }
    }))

    return config
  }
}
