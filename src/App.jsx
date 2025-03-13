import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PhotoPage from './pages/PhotoPage/PhotoPage';
import AboutPage from './pages/AboutPage/AboutPage';
import FavoritesPage from './pages/FavouritesPage/FavouritesPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photos/:id" element={<PhotoPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/favourites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
