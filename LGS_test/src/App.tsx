import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './componant/Home';
import AlertList from './componant/AlertList';
import Stats from './componant/Stats';
import './App.css';

const App: React.FC = () => {
  const [selectedProps, setSelectedProps] = useState({ statsProps: 1 });
  return (
    <>
        <Routes>
          <Route path="/" element={<Home setSelectedProps={setSelectedProps}/>} />
          <Route path="/stats" element={<Stats  {...selectedProps}/>} />
          <Route path="/alerts" element={<AlertList setSelectedProps={setSelectedProps}/>} />
        </Routes>
    </>
  );
};

export default App;