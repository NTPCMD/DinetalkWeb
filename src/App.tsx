import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PageShell } from './components/PageShell';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { ConciergePage } from './pages/ConciergePage';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route element={<PageShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/concierge" element={<ConciergePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
