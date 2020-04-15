import React from 'react';
import ImaagesContainer from './ImagesContainer'
import MovieContainer from './MovieContainer'
import './App.css';

function App() {
  
  return (
    <div id="app">
      <div style={{"textAlign":"center"}}className = "neon-orange">
          Movie
        </div>
        <div style={{"textAlign":"center"}} className = "neon-blue">
          Doodler
        </div>
      {/* <ImaagesContainer /> */}
      <MovieContainer/>
    </div>
  );
}

export default App;
