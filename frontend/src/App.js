import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage   from './HomePage';
import UploadPage from './UploadPage';
import ChartsPage from './ChartsPage';      // ⬅ new

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/upload"   element={<UploadPage />} />
        <Route path="/charts"   element={<ChartsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
