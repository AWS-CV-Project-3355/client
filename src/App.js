import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import HomeView from './views/HomeView';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeView />} />
    </Routes>
  );
}

export default App;
