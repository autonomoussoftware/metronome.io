import config from './config'

function init() {
  window.dataLayer = window.dataLayer || []

  window.gtag =
    window.gtag ||
    function() {
      window.dataLayer.push(arguments)
    }

  if (!config.gaTrackingId) {
    return
  }

  window.gtag('js', new Date())
  window.gtag('config', config.gaTrackingId)
}

export default { init }
