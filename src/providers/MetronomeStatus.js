import createMetronomeStatusStream from 'metronome-status'
import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class MetronomeStatus extends Component {
  static propTypes = {
    metApiUrl: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
    onData: PropTypes.func.isRequired
  }

  statusStream = null

  componentDidMount() {
    this.initStream()
  }

  initStream() {
    this.statusStream = createMetronomeStatusStream({
      web3currentProvider: window.web3 && window.web3.currentProvider,
      metApiUrl: this.props.metApiUrl
    })
    this.statusStream.on('data', this.props.onData)
    this.statusStream.on('error', this.props.onError)
  }

  killStream() {
    if (this.statusStream) {
      this.statusStream.destroy()
      this.statusStream.off('data', this.props.onData)
      this.statusStream.off('error', this.props.onError)
      this.statusStream = null
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.metApiUrl !== prevProps.metApiUrl) {
      this.killStream()
      this.initStream()
    }
  }

  componentWillUnmount() {
    this.killStream()
  }

  render() {
    return null
  }
}

const mapStateToProps = state => ({
  metApiUrl: state.config.chains[state.chain.active].metApiUrl
})

const mapDispatchToProps = dispatch => ({
  onError: payload => dispatch({ type: 'METRONOME_STATUS_ERROR', payload }),
  onData({ auction, converter, proceeds }) {
    dispatch({ type: 'UPDATE_AUCTION_STATUS', payload: auction })
    dispatch({ type: 'UPDATE_PROCEEDS_STATUS', payload: proceeds })
    dispatch({ type: 'UPDATE_CONVERTER_STATUS', payload: converter })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetronomeStatus)
