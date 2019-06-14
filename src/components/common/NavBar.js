import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import ChainSelector from '../common/ChainSelector'
import config from '../../config'

const isMultichain = Object.keys(config.chains).length > 1

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 24px;
  border-bottom: 2px solid #d1d1d1;
  padding: 8px 0;
`

const LinkContainer = styled.div`
  flex-grow: 1;
  margin-left: ${p => (p.isMultichain ? '32px' : 0)};
`

const Link = styled.a`
  font-size: 16px;
  font-weight: normal;
  line-height: 1.8;
  letter-spacing: 0.3px;
  color: ${p => (p.isActive ? '#7e61f8' : 'rgb(98, 98, 98)')};
  display: inline-block;
  padding-left: 16px;
  padding-right: 16px;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  &:hover,
  &:focus {
    color: #7e61f8;
    text-decoration: none;
  }
`

export default class NavBar extends React.Component {
  static propTypes = {
    activePage: PropTypes.string
  }

  render() {
    return (
      <Container>
        {isMultichain && <ChainSelector />}
        <LinkContainer isMultichain={isMultichain}>
          {/* <Link
            isActive={this.props.activePage === 'converter'}
            href="../converter"
          >
            Converter
          </Link> */}
          <Link
            isActive={this.props.activePage === 'auction'}
            href="../auction"
          >
            Auction
          </Link>
        </LinkContainer>
        <Link
          isActive={this.props.activePage === 'dashboard'}
          href="../dashboard"
        >
          Dashboard
        </Link>
      </Container>
    )
  }
}
