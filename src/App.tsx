import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import AddUser from './Body/AddUser';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <AddUser/>
    </div>
  );
}

export default App;
