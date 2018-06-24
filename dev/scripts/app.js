import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage';
import firebase from 'firebase';


class App extends React.Component {
  render() {
    return (
      <div className="main-container">
        <LandingPage />
        {/* 
        1. Landing page has a moon, a form, and a submit button
        - date is manually input or grabbed?
        - rate sleep with number of stars (click says how many)
        - average per week? or per entries?
        
        2. On click, trigger an animation AND submit button changes view to the list of all journal entries

        3. MAKE IT RESPONSIVE
        Think about how to apply user log-in
        3. Stretch goal: add a counter that shows number of entries
        4. Stretch goal: add a graph to show how sleep is going
        
        
        */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
