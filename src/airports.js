import React from 'react'
import app from 'ampersand-app'
import xhr from 'xhr'
import AirControls from './AirControls'

export default class Airports extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      airports: []
    }
  }

  componentDidMount () {
    if (app.airports) {
      console.log(app.airports)
    } else {
      console.log('Making xhr call')
      xhr({
        url: 'https://api.ryanair.com/aggregate/3/common?embedded=airports,countries,cities,regions&market=en-gb',
        json: true
      }, (err, req, body) => {
        if (err) {
          console.error('Something went wrong', err)
        }
        app.airports = body.airports
        const airports = body.airports
        this.setState({
          airports,
          loading: false
        })
      })
    }
  }

  renderLoading () {
    return <div>Loading...</div>
  }

  renderAirports () {
    const {airports} = this.state

    return (
      <ul className='list-unstyled'>
        {airports.map(airport =>
          <li key={airport.iataCode} className='airports-item'>
            {airport.name} - {airport.countryCode.toUpperCase()}
            <AirControls airport={airport} />
          </li>
        )}
      </ul>
    )
  }

  render () {
    return (
      <div className='airports-list'>
        {this.state.loading ? this.renderLoading() : this.renderAirports()}
      </div>
    )
  }
}
