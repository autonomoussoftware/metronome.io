import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import { useWallet, chainNameToId } from '../utils.js'
import DownloadWalletBlock from './DownloadWalletBlock'
import CopyToClipboardBtn from './CopyToClipboardBtn'
import { Link, Btn } from './Btn.js'
import arrowIcon from '../img/arrow-forward-24-px.svg'
import QrBlock from './QrBlock'

const Container = styled.div`
  padding: 40px 20px;
`

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  letter-spacing: 0.6px;
  color: #fff;
`

const Message = styled.p`
  color: #c2c4c6;
  font-size: 13px;
`

const ConvertWithBtn = styled(Btn)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 18px;
  padding-right: 18px;
`

const ConvertWithLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 18px;
  padding-right: 18px;
`

const Arrow = styled.img.attrs({
  src: arrowIcon
})`
  margin -5px 0;
`

const Separator = styled.div`
  border-bottom: 1px solid #202020;
  margin: 15px 0;
`

const OrSeparator = styled.div`
  border-bottom: 1px solid #202020;
  height: 16px;
  margin-top: 30px;
  margin-bottom: 45px;

  &:after {
    content: 'or';
    font-size: 13px;
    color: white;
    display: block;
    background: #41434c;
    border-radius: 32px;
    width: 32px;
    text-align: center;
    line-height: 1;
    padding: 8px 0 10px;
    margin: 0 auto;
  }
`

const web3Provider = detectProvider('web wallet')

const isWeb3Available = web3Provider !== 'none'

class ConvertPanelOptions extends React.Component {
  static propTypes = {
    contractAddress: PropTypes.string.isRequired,
    showForm: PropTypes.func.isRequired,
    chainId: PropTypes.number.isRequired
  }

  render() {
    const { contractAddress, showForm, chainId } = this.props

    return (
      <Container>
        <Subtitle>How would you like to convert ETH to MET?</Subtitle>

        <section>
          {isWeb3Available ? (
            <ConvertWithBtn onClick={showForm} block>
              Convert with {web3Provider} <Arrow />
            </ConvertWithBtn>
          ) : (
            <ConvertWithLink href={useWallet.url} target="_blank" block>
              Convert with {useWallet.name} <Arrow />
            </ConvertWithLink>
          )}
        </section>

        <Separator />

        <DownloadWalletBlock />

        <OrSeparator />

        <section>
          <Subtitle>Convert With Your Own Wallet</Subtitle>
          <Message>
            To make a conversion, send ETH to the EIP 681-compatible URL below.
            Make sure the URL you use is that one. We recommend copying it or
            scanning the QR code.
          </Message>
          <CopyToClipboardBtn
            successText="URL Copied!"
            btnLabel="Copy URL to Clipboard"
            value={`ethereum:${contractAddress}@${chainId}/convertEthToMet?uint256=1`}
            title="URL"
          />
        </section>

        <Separator />

        <QrBlock
          imgSrc={`https://chart.googleapis.com/chart?cht=qr&chs=160x160&choe=UTF-8&chl=ethereum:${contractAddress}@${chainId}/convertEthToMet?uint256=1`}
          label="Scan URL"
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  contractAddress: state.config.converterAddress,
  chainId: chainNameToId(state.config.chain)
})

const mapDispatchToProps = dispatch => ({
  showForm: () => dispatch({ type: 'SHOW_CONVERT_FORM' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertPanelOptions)
