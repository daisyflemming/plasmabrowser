import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom'
import {connect} from "react-redux";

let Navbar = (props) => {
  let { sequences } = props;
  return (
    <nav className="nav-wrapper purple darken-4">
      <div className="container">
        <Link className="brand-logo left" to="/">Plasma Browser</Link>
        <ul className="right">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to='/importSequences'>Import Sequences</NavLink></li>
          <li><NavLink to='/addNewSequence'>Add New DNA Sequence</NavLink></li>
          <li><NavLink to='/viewSequences'>View Sequences
            <span className="badge white-text indigo">{sequences.length}</span>
          </NavLink></li>
        </ul>
      </div>
    </nav> 
  )
};

const mapStateToProps = (state) => {
  return {
    sequences: state.rootReducer.sequences
  }
};

Navbar = connect(
  mapStateToProps
)(Navbar);

export default withRouter(Navbar)