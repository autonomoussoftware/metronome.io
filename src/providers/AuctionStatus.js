import { Component } from 'react'
import { connect } from 'react-redux'
import createAuctionStatusStream from 'metronome-auction-status'

class AuctionStatus extends Component {
  componentDidMount () {
    this.statusStream = createAuctionStatusStream({
      web3currentProvider: window.web3 && window.web3.currentProvider,
      metApiUrl: this.props.metApiUrl
    })
    this.statusStream.on('data', this.props.onAuctionData)
    this.statusStream.on('error', this.props.onError)
  }

  componentWillUnmount () {
    this.statusStream.destroy()
  }

  render () {
    return null
  }
}

const mapStateToProps = state => ({
  metApiUrl: state.config.metApiUrl
})

const mapDispatchToProps = dispatch => ({
  onAuctionData: payload => dispatch({
    type: 'UPDATE_AUCTION_STATUS',
    payload
  }),
  onError: payload => dispatch({
    type: 'AUCTION_STATUS_ERROR',
    payload
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(AuctionStatus)
