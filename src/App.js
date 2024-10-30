import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Board
} from './pages/index';
import ControlProvider from './context/ControlContext';

function App() {
  return (
    <BrowserRouter>
      <ControlProvider>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/board/:category" element={<Board />} />
        </Routes>
      </ControlProvider>
    </BrowserRouter>
  );
}

export default App;
