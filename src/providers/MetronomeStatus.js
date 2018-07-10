import { Component } from 'react'
import { connect } from 'react-redux'
import createMetronomeStatusStream from 'metronome-status'

class MetronomeStatus extends Component {
  componentDidMount () {
    this.statusStream = createMetronomeStatusStream({
      web3currentProvider: window.web3 && window.web3.currentProvider,
      metApiUrl: this.props.metApiUrl
    })
    this.statusStream.on('data', this.props.onData)
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
  onData ({ auction, converter }) {
    dispatch({
      type: 'UPDATE_AUCTION_STATUS',
      payload: auction
    })
    dispatch({
      type: 'UPDATE_CONVERTER_STATUS',
      payload: converter
    })
  },
  onError: payload => dispatch({
    type: 'METRONOME_STATUS_ERROR',
    payload
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(MetronomeStatus)
