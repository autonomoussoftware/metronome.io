import { connect } from 'react-redux'
import React, { Component } from 'react'

import downloadHelper from '../download-helper'

class AppsDownloadButton extends Component {
  render () {
    const {
      currentOS,
      baseReleaseUrl,
      walletInstaller,
      walletInstallers
    } = downloadHelper(this.props.desktopAppVersion)

    return (
      <div className="downloads__main-container">
        <div className="downloads__main-parallax-layer">
          <div className="downloads__content-container">
            <div className="downloads__met-icon">
              <img src="/images/metronome-apps-logo.png" alt="metronome-apps-logo"/>
            </div>
            <div className="downloads__title-container">
              <h1 className="downloads__header-title">Download the App</h1>
              <h2 className="mt-2">Get started with the Metronome Wallet</h2>
            </div>
            {walletInstaller && <a href={walletInstaller.url} className="btn">
              Download For {currentOS.name} {currentOS.version}
            </a>}
            <a href="#download-options" className="link__sm">See all download options</a>
            <div className="downloads__app-screenshot">
              <img
                className="--slideUp"
                src="/images/metronome-apps-demo.png"
                srcSet="/images/metronome-apps-demo@2x.png 2x, /images/metronome-apps-demo@3x.png 3x"
                alt="Metronome App Demo"
              />
            </div>
          </div>
          <div className="envelope__footer" id="download-options">
            <h2>Desktop Downloads</h2>
            <div className="envelope__footer-downloads">
              <ul>
                <li><a href={walletInstallers['Mac OS'].url} className="btn">
                  Download For Mac OS
                </a></li>
                <li><a href={walletInstallers['Windows'].url} className="btn">
                  Download For Windows
                </a></li>
                <li><a href={walletInstallers['Ubuntu'].url} className="btn">
                  Download For Linux
                </a></li>
              </ul>
            </div>
            <div data-toggle="scroll__here" className="envelope__footer-coming-soon">
              <a href={baseReleaseUrl} target="_blank">View all releases</a>
            </div>
            <h2>Mobile Downloads</h2>
            <div className="envelope__footer-downloads mb-5">
              <ul>
                <li><a href={walletInstallers['iOS'].url} className="">
                  <img alt="Download on the App Store" src="/images/appstore-btn.svg" />
                </a></li>
                <li><a href={walletInstallers['Android'].url} className="">
                  <img alt="Get it on Google play" src="/images/gplay-btn.svg" />
                </a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  desktopAppVersion: state.config.desktopAppVersion
})

export default connect(mapStateToProps)(AppsDownloadButton)
