const path = require('path')
const rewireEslint = require('react-app-rewire-eslint')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID || 'UA-116275666-1'

module.exports = {
  webpack(config, env) {
    config = rewireEslint(config, env)

    const pages = [
      'index.html',
      'about/index.html',
      'auction/index.html',
      'build/index.html',
      'buy/index.html',
      'converter/index.html',
      'dashboard/index.html',
      'engage/index.html',
      'privacy/index.html',
      'thank-you/index.html',
      'thank-you/index.html',
      'wallet/index.html'
    ]

    pages.forEach(function(filename) {
      config.plugins.push(
        new HtmlWebpackPlugin({
          inject: true,
          template: path.join(__dirname, `./public/${filename}`),
          filename,
          params: { gaTrackingId }
        })
      )
    })

    return config
  }
}
