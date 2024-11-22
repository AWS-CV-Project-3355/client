import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Upload from './components/Upload';
import Graph from './components/Graph';
import Help from './components/Help';
import Settings from './components/Settings';
import Main from './components/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="upload" element={
          <>
            <Upload />
            <div className="main-content">
              {/* <Main /> */}
            </div>
          </>
        } />
        <Route path="graph" element={
          <>
            <Graph />
            <div className="main-content">
              {/* <Main /> */}
            </div>
          </>
        } />
        <Route path="help" element={
          <>
            <Help />
            <div className="main-content">
              {/* <Main /> */}
            </div>

          </>
        } />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
