import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import React from 'react'

import Receipt from './Receipt'
import Waiting from './Waiting'

ReactModal.setAppElement('body')

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(51, 51, 53,0.5)',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    borderRadius: 0,
    background: 'transparent',
    padding: '12vh 0',
    width: '100%',
    maxWidth: '352px',
    top: 0,
    bottom: 0,
    left: 'auto',
    right: 'auto',
    border: 'none'
  }
}

class Modal extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    showStep: PropTypes.string,
    isOpen: PropTypes.bool.isRequired
  }

  render() {
    return (
      <ReactModal
        onRequestClose={this.props.onRequestClose}
        isOpen={this.props.isOpen}
        style={customStyles}
      >
        {this.props.showStep === 'waiting' && (
          <Waiting onRequestClose={this.props.onRequestClose} />
        )}
        {this.props.showStep === 'receipt' && (
          <Receipt onRequestClose={this.props.onRequestClose} />
        )}
      </ReactModal>
    )
  }
}

const mapStateToProps = state => ({
  showStep: state.convertPanel.showStep,
  isOpen:
    state.convertPanel.showStep === 'receipt' ||
    state.convertPanel.showStep === 'waiting'
})

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch({ type: 'SHOW_CONVERT_OPTIONS' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
