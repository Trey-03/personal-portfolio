
import './App.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import References from './pages/References';
import Contact from './pages/Contact';

import AdminDashboard from './components/admin/AdminDashboard';
import Users from './components/admin/Users';
import AdminProjects from './components/admin/Projects';
import AdminServices from './components/admin/Services';
import AdminReferences from './components/admin/References';

function App() {
  return (
    <BrowserRouter>
      <div className="website">

        <nav className="navbar">
          <h2 className="logo">MY PORTFOLIO</h2>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/references">References</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/admin">Admin Dashboard</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/references" element={<References />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/references" element={<AdminReferences />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
