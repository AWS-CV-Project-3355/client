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
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="history" element={
          <>
            <History />
          </>
        } />
        <Route path="graph" element={
          <>
            <Graph />
          </>
        } />
      </Route>
    </Routes>
  );
}

export default App;
