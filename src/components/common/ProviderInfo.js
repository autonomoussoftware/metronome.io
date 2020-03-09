import detectProvider from 'web3-detect-provider'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UAParser from 'ua-parser-js'
import styled from 'styled-components'
import React from 'react'

import MetaMask from '../../img/metamask.svg'
import Cipher2x from '../../img/cipher@2x.png'
import Cipher3x from '../../img/cipher@3x.png'
import MetValue from '../common/MetValue'
import EthValue from '../common/EthValue'
import unknown from '../../img/unknown.svg'
import Trust2x from '../../img/trust@2x.png'
import Trust3x from '../../img/trust@3x.png'
import Cipher from '../../img/cipher.png'
import Trust from '../../img/trust.png'

const Container = styled.div`
  height: 48px;
  align-items: center;
  border-radius: 24px;
  border: solid 1px #d1d1d1;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
`

const Icon = styled.img``

const Info = styled.div`
  margin-left: 16px;
`

const Label = styled.div`
  font-size: 16px;
  letter-spacing: 0.3px;
  color: #626262;
  line-height: 1.1;
`

const Balance = styled.div`
  line-height: 1.1;
  font-size: 11px;
  letter-spacing: 0.3px;
`

const GetLabel = styled.span`
  margin-left: 8px;
`

const Separator = styled.span`
  &:before {
    content: ' | ';
    display: inline-block;
    margin: 0 6px;
    color: #d1d1d1;
  }
`

function ProviderInfo(props) {
  const { metBalance, provider, address, balance } = props

  const isWeb3Available = provider !== 'none'

  const isMobile = ['mobile', 'tablet'].includes(
    new UAParser().getDevice().type
  )

  const useWallet = isMobile
    ? { name: 'Cipher', url: 'https://www.cipherbrowser.com/' }
    : { name: 'MetaMask', url: 'https://metamask.io' }

  return isWeb3Available ? (
    <Container>
      <Icon
        srcSet={
          {
            Cipher: `${Cipher2x} 2x, ${Cipher3x} 3x`,
            Trust: `${Trust2x} 2x, ${Trust3x} 3x`
          }[provider]
        }
        src={{ MetaMask, Cipher, Trust, unknown }[provider] || unknown}
        alt={provider}
      />
      <Info>
        {address ? (
          <Label>
            Acct *{address.slice(0, 6)}…{address.slice(-4)}
          </Label>
        ) : (
          <Label>Log into your web wallet</Label>
        )}
        {(balance || metBalance) && (
          <Balance>
            {balance && <EthValue>{balance}</EthValue>}
            <Separator />
            {metBalance && <MetValue>{metBalance}</MetValue>}
          </Balance>
        )}
      </Info>
    </Container>
  ) : (
    <Container as="a" href={useWallet.url} target="_blank">
      <Icon
        srcSet={
          {
            Cipher: `${Cipher2x} 2x, ${Cipher3x} 3x`
          }[useWallet.name]
        }
        src={{ MetaMask, Cipher }[useWallet.name]}
        alt={useWallet.name}
      />
      <GetLabel>Get {useWallet.name}</GetLabel>
    </Container>
  )
}

ProviderInfo.propTypes = {
  metBalance: PropTypes.string,
  provider: PropTypes.string.isRequired,
  address: PropTypes.string,
  balance: PropTypes.string
}

const mapStateToProps = state => ({
  metBalance: state.wallet.metBalance,
  provider: detectProvider('web wallet'),
  address: state.wallet.address,
  balance: state.wallet.balance
})

export default connect(mapStateToProps)(ProviderInfo)
