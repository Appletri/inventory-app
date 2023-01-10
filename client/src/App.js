import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Bag from './components/Bag';
import Discover from './components/Discover';
import Forge from './components/Forge';
import Layout from './components/Layout';

function App() {
  const [inventory, setInventory] = useState();
  const [itemID, setItemID] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const selectItem = (itemID) => {
    setItemID(itemID);
  }

  useEffect(() => {
    const url = 'http://localhost:9000/testAPI/';
    
    const fetchData = async() => {
      try{
        const response = await fetch(url);
        const json = await response.json();
        setInventory(json[0]);
      } catch (error){
        console.log('error', error)
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const url = `http://localhost:9000/testAPI/${itemID}`;
    
    if (itemID === undefined) return;

    const fetchData = async() => {
      try{
        const response = await fetch(url);
        const json = await response.json();
        setSelectedItem(json);
      } catch (error){
        console.log('error', error)
      }
    }
    
    fetchData();

  }, [ itemID ]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout item={itemID}/>}>
            <Route index element={<Bag bag={inventory} 
            selectItem={selectItem}/>} />
            <Route path='discover' element={<Discover />} />
            <Route path='forge' element={<Forge item={selectedItem}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
