import React from 'react';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar'
import 'materialize-css/dist/css/materialize.min.css'
import Home from './components/Home';
import AddNewSequence from './components/sequences/AddNewSequence';
import ViewSequences from './components/sequences/ViewSequences';
import ImportSequences from './components/sequences/ImportSequences';

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/importSequences' component={ImportSequences}/>
          <Route path='/addNewSequence' component={AddNewSequence}/>
          <Route path='/viewSequences' component={ViewSequences}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
