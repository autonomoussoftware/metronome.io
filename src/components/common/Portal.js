import PropTypes from 'prop-types'
import reactDOM from 'react-dom'
import React from 'react'

export default class Portal extends React.Component {
  static propTypes = {
    selector: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  render() {
    const element = document.querySelector(this.props.selector)

    if (!element) {
      // eslint-disable-next-line no-console
      console.warn(
        `Selector "${
          this.props.selector
        }" could not be find any node in the document. Check your markup.`
      )
      return null
    }

    return reactDOM.createPortal(this.props.children, element)
  }
}
