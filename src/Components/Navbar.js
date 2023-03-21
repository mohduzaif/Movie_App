import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", color : "blue", width: "100vw"}}>
            <Link to = "/">
              <h1>Movie App</h1>
            </Link>
            <Link to = "/fav">
              <h2 style={{marginLeft:"2rem"}}>Favourites</h2>
            </Link>
      </div>
    )
  }
}