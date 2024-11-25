import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import History from './components/History';
import Graph from './components/Graph';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="upload" element={
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
