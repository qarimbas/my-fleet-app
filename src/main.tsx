import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MetarData from './components/MetarData';
import About from './pages/About';
import Contact from './pages/Contact';

const Home = () => {
  return (
    <div>
      <h1>Welcome to My Fleet App</h1>
      <p>This is the home page.</p>
      <MetarData station="LTBD" />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
