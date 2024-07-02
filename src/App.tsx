import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import TV from './Routes/TV';
import Search from './Routes/Search';
import Header from './Components/Header';

const App = () => {
  return (
    <>
      <BrowserRouter basename="/S-FLEX">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:movieId" element={<Home />} />
          <Route path="/movies/:category/:movieId" element={<Home />} />

          <Route path="/tv" element={<TV />} />
          <Route path="/tv/:category/:tvId" element={<TV />} />

          <Route path="/search" element={<Search />} />
          <Route path="/search/movies/:movieId" element={<Search />} />
          <Route path="/search/tv/:tvId" element={<Search />} />
          <Route path="/search?keyword=:keyword" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
