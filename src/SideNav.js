import React from 'react'
import app from 'ampersand-app'

export default class SideNav extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      bucket: []
    }
  }

  componentDidMount () {
    let bucket = []

    app.on('airports:add', (payload) => {
      bucket.push(payload.observedLocation)
      this.setState({ bucket })
    })
  }

  onRemoveClick (currItem, event) {
    let bucket = this.state.bucket
    let newBucket = bucket.filter(item => item.iataCode !== currItem.iataCode)
    this.setState({ bucket: newBucket })
    app.trigger('airports:remove', {observedLocation: currItem})
  }

  render () {
    const {bucket} = this.state

    return (
      <aside className='side-nav'>
        <header className='side-nav-header'>Route Maps</header>
        <hr />
        <div className='observed-airports-js'>
          <h3>Observed Airports:</h3>
          <ul className='list-unstyled list-inline'>
            {bucket.map(item => {
              return (
                <div key={item.iataCode} >
                  <li>{item.name}</li>
                  <button
                    className='button button-warn button-small'
                    onClick={this.onRemoveClick.bind(this, item)}>
                    Remove
                  </button>
                </div>
              )
            })}
          </ul>
        </div>
        <hr />
        <form onSubmit={this.onSubmit}>
          <div className='form-element'>
            <label htmlFor='location'>Search location:</label>
            <input type='text' id='location' placeholder='Departure Airport' className='form-input input-dark' />
          </div>
          <button type='submit' className='button button-block'>Search</button>
        </form>
      </aside>
    )
  }
}
