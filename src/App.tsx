import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import TV from './Routes/TV';
import Search from './Routes/Search';
import Header from './Components/Header';
import GenreMovie from './Routes/GenreMovie';
import GenreTv from './Routes/GenreTv';
import Footer from './Components/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter basename="S-FLEX">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:category/:movieId" element={<Home />} />

          <Route path="/tv" element={<TV />} />
          <Route path="/tv/:category/:tvId" element={<TV />} />

          <Route path="/genre/movies" element={<GenreMovie />} />
          <Route path="/genre/movies/:movieId" element={<GenreMovie />} />

          <Route path="/genre/tv" element={<GenreTv />} />
          <Route path="/genre/tv/:tvId" element={<GenreTv />} />

          <Route path="/search" element={<Search />} />
          <Route path="/search/movies/:movieId" element={<Search />} />
          <Route path="/search/tv/:tvId" element={<Search />} />
          <Route path="/search?keyword=:keyword" element={<Search />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
