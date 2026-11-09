import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Chapter1 from './pages/chapter1';
import Crud from './pages/crud';

function App() {
  return (
    <div>
      <h1>welcome</h1>
     <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chapter1" element={<Chapter1 />} />
          <Route path="/crud" element={<Crud />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
