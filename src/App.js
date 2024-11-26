import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import History from './components/History';
import Graph from './components/Graph';

function App() {

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    localStorage.removeItem('uploadedVideo');
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout selectedItem={selectedItem} onItemClick={handleItemClick} onBackToList={handleBackToList} />}>
        <Route path="history" element={<History onItemClick={handleItemClick} selectedItem={selectedItem} />} />
        <Route path="graph" element={<Graph />} />
      </Route>
    </Routes>
  );
}

export default App;
