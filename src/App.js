import React from 'react';
// import logo from './logo.svg';
import './utils/css/App.css';
import Main from "./components/Data";
import Header from "./components/Header";
import Wrapper from './components/Wrapper';

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Header />
        <Main />
      </Wrapper>
    </div>
  );
}


export default App;
