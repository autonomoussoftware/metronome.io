const path = require('path')
const rewireEslint = require('react-app-rewire-eslint')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID

module.exports = {
  webpack (config, env) {
    config = rewireEslint(config, env)

    const pages = [
      'index.html',
      'features/index.html',
      'media-kit/index.html',
      'apps/index.html',
      'auction/index.html',
      'dashboard/index.html'
    ]

    pages.forEach(function (filename) {
      config.plugins.push(new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, `./public/${filename}`),
        filename,
        params: { gaTrackingId }
      }))
    })

    return config
  }
}
