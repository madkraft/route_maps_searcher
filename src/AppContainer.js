import React from 'react'
import Airports from './airports'
import SideNav from './SideNav'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Airports />
        <SideNav />
      </div>
    )
  }
}
