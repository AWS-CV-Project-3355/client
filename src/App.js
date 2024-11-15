import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Upload from './components/Upload';
import Graph from './components/Graph';
import Help from './components/Help';
import Settings from './components/Settings';
import Detect from './components/Detect';
import NGList from './components/NGList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="upload" element={
          <>
            <Upload />
            <div className="main-content">
              <Detect />
              <NGList />
            </div>
          </>
        } />
        <Route path="graph" element={
          <>
            <Graph />
            <div className="main-content">
              <Detect />
              <NGList />
            </div>
          </>
        } />
        <Route path="help" element={<Help />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
