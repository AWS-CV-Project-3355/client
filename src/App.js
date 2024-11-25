import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Upload from './components/Upload';
import Graph from './components/Graph';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="upload" element={
          <>
            <Upload />
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
