import { Box } from '@mui/material';
import './App.css'
import Scout from './views/Scout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Reports from 'views/Reports/Crescendo'
import Graphs from 'views/Graphs/Crescendo'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Scout />} />
          <Route path="reports" element={<Reports />} />
          <Route path="graphs" element={<Graphs />} />
          <Route path="scout" element={<Scout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
