import config from './config'

function init () {
  window.dataLayer = window.dataLayer || []

  const gtag = window.gtag || function () {
    window.dataLayer.push(arguments)
  }

  if (!config.gaTrackingId) {
    return
  }

  gtag('js', new Date())
  gtag('config', config.gaTrackingId)
}

export default { init }
