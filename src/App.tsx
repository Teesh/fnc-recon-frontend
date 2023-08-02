import './App.css'
import Scout from './views/Scout'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Scout />
      </BrowserRouter>
    </div>
  );
}

export default App;
