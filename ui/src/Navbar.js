import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom'
import {connect} from "react-redux";

let Navbar = (props) => {
  return (
    <nav className="nav-wrapper purple darken-4">
      <div className="container">
        <Link className="brand-logo left" to="/">Sequence Browser</Link>
        <ul className="right">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to='/importSequences'>Import Sequences</NavLink></li>
        </ul>
      </div>
    </nav> 
  )
};

const mapStateToProps = (state) => {
  return {
  }
};

Navbar = connect(
  mapStateToProps
)(Navbar);

export default withRouter(Navbar)