// import logo from './logo.svg';

import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import List from './Components/List';
import Favourites from './Components/Favourites';
import {BrowserRouter, Routes, Route} from 'react-router-dom';  
import React from 'react';

function App() {
  return (
    <>
      {/* <Navbar/>
      <Banner/>
      <List/>
      <Favourites/> */}
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = "/" element = {
            <>
              <Banner/>
              <List/>
            </>
          }/>
          <Route path='/fav' element = {<Favourites/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
