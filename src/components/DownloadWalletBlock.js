import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import downloadHelper from '../download-helper'
import arrowIcon from '../img/arrow-forward-24-px.svg'
import { Link } from './Btn.js'

const Container = styled.div`
  clear: both;
  display: inline-block;
  width: 100%;
  position: relative;
  text-align: left;
`

const DownloadLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 18px;
  padding-right: 18px;
  text-align: left;
`

const Arrow = styled.img.attrs({
  src: arrowIcon
})`
  margin -5px 0;
  transform: rotate(90deg);
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`

const OSicon = styled.img`
  margin-right: 10px;
  width: 20px;
`

const VersionNumber = styled.div`
  font-size: 13px;
  color: #c2c4c6;
  flex-grow: 1;
`

const AllVersionsLink = styled.a`
  font-size: 13px;
  text-align: right;
  color: white !important;
  text-decoration: underline;

  &:hover,
  &:focus {
    opacity: 0.7;
    outline: none;
  }
`

class DownloadWalletBlock extends Component {
  static propTypes = {
    desktopAppVersion: PropTypes.string
  }

  render() {
    const { currentOS, downloadWalletUrl, walletInstaller } = downloadHelper(
      this.props.desktopAppVersion
    )

    return (
      <Container>
        <DownloadLink
          block
          href={
            walletInstaller
              ? `${downloadWalletUrl}.${walletInstaller.ext}`
              : '/apps'
          }
        >
          Download Metronome Wallet
          <Arrow />
        </DownloadLink>

        {walletInstaller && (
          <Row>
            <OSicon alt="" src={walletInstaller.icon} />
            <VersionNumber>{currentOS.version}</VersionNumber>
            <AllVersionsLink href="/apps">
              See all download options
            </AllVersionsLink>
          </Row>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  desktopAppVersion: state.config.desktopAppVersion
})

export default connect(mapStateToProps)(DownloadWalletBlock)
