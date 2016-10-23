import React from 'react'
import app from 'ampersand-app'

export default class AirControls extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      disabled: false
    }

    this.onAddClick = this.onAddClick.bind(this)
  }

  componentDidMount () {
    app.on('airports:remove', (payload) => {
      let airport = payload.observedLocation

      if (this.state.disabled === true && this.props.airport.iataCode === airport.iataCode) {
        this.setState({ disabled: false })
      }
    })
  }

  onAddClick (event) {
    app.trigger('airports:add', {observedLocation: this.props.airport})
    this.setState({disabled: true})
  }

  render () {
    return (
      <div className='airport-controls'>
        <button onClick={this.onAddClick} className='button button-approve button-small' disabled={this.state.disabled}>
          Add
        </button>
        <input type='number' className='form-input form-element price-limit' value='5' />
      </div>
    )
  }
}
