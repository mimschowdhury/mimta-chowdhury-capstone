import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PhotoPage from './pages/PhotoPage/PhotoPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photos/:id" element={<PhotoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
