import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import downloadHelper from '../../download-helper'

class Wallet extends Component {
  static propTypes = {
    desktopAppVersion: PropTypes.string
  }

  render() {
    const {
      walletInstallers,
      walletInstaller,
      baseReleaseUrl,
      currentOS
    } = downloadHelper(this.props.desktopAppVersion)

    return (
      <React.Fragment>
        <section id="top" className="site-section intro">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="page-title">Download the App</h1>
                <h3 className="font-italic mb-5">
                  Get started with Metronome Wallet.
                </h3>
                <p>
                  {walletInstaller && (
                    <a
                      className="btn btn-primary mr-4"
                      href={walletInstaller.url}
                    >
                      Download For {currentOS.name} {currentOS.version} &raquo;
                    </a>
                  )}
                  <a href="#options">See all Download Options &raquo;</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="look" className="site-section look pb-5 mb-4">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <img
                  src="../dist/images/wallet-look.png"
                  className="img-fluid"
                  alt="Wallet screenshot"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="site-section download pb-5">
          <div className="container">
            <div className="row pb-5">
              <div className="col-lg-6 col-xl-4">
                <h4 id="options" className="text-light offset mb-4">
                  Desktop Downloads
                </h4>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a
                      href={walletInstallers['Mac OS'].url}
                      className="btn btn-primary w-75 text-left"
                    >
                      Download for Mac OS &raquo;
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href={walletInstallers['Windows'].url}
                      className="btn btn-primary w-75 text-left"
                    >
                      Download for Windows &raquo;
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href={walletInstallers['Ubuntu'].url}
                      className="btn btn-primary w-75 text-left"
                    >
                      Download for Linux &raquo;
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href={baseReleaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-default w-75 text-left txt-mute"
                    >
                      View All Releases &raquo;
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-xl-4">
                <h4 className="text-light mb-4">Mobile Downloads</h4>
                <a
                  className="mr-2"
                  href={walletInstallers['iOS'].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="../dist/images/apple-download.png"
                    alt="Apple app download"
                  />
                </a>
                <a
                  href={walletInstallers['Android'].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="../dist/images/android-download.png"
                    alt="Android app download"
                  />
                </a>
              </div>
              <div className="col-lg-6 visible-lg visible-xl" />
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  desktopAppVersion: state.config.desktopAppVersion
})

export default connect(mapStateToProps)(Wallet)
