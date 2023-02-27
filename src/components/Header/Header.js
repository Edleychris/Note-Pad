import React, { Component } from 'react';
import './Header.css'
export default class Header extends Component {
  render() {
    return (
      <div className='head'>
        <h1>Note Pad...</h1>
        <p>Welcome, Add a note, double tap to modify a note.</p>
      </div>
    )
  }
}
