import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PhotoPage from './pages/PhotoPage/PhotoPage';
import AboutPage from './pages/AboutPage/AboutPage';
import FavoritesPage from './pages/FavouritesPage/FavouritesPage';
import LocationsPage from './pages/LocationsPage/LocationsPage';
import CafeQuizPage from './pages/CafeQuizPage/CafeQuizPage';
import CafeWeekPage from './pages/CafeoftheWeekPage/CafeoftheWeekPage';
import CollagePage from './pages/CollagePage/CollagePage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photos/:id" element={<PhotoPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/favourites" element={<FavoritesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/quiz" element={<CafeQuizPage />} />
        <Route path="/cafeoftheweek" element={<CafeWeekPage />} />
        <Route path="/collage" element={<CollagePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
