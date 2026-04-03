import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TeamBuilder from './pages/TeamBuilder';
import Strategies from './pages/Strategies';
import Meta from './pages/Meta';
import Resources from './pages/Resources';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-pokemon-darker flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<TeamBuilder />} />
            <Route path="/strategies" element={<Strategies />} />
            <Route path="/meta" element={<Meta />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
        <footer className="border-t border-white/5 py-4 px-4 text-center text-white/30 text-xs">
          Pokemon Champions VGC Builder — Fan-made tool. Pokemon is owned by Nintendo / The Pokemon Company.
        </footer>
      </div>
    </BrowserRouter>
  );
}
