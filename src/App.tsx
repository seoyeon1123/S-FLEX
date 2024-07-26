import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Routes/Home';
import TV from './Routes/TV';
import Search from './Routes/Search';
import Header from './components/Header';
import GenreMovie from './Routes/GenreMovie';
import GenreTv from './Routes/GenreTv';
import Footer from './components/Footer';
import PrivateRoute from 'utils/PrivateRoute';
import Login from 'Routes/login';
import Signup from 'Routes/signup';
import { ProfileProvider } from 'components/ProfileContext';
import Profil from 'components/profil';

const App = () => {
  return (
    <>
      <BrowserRouter basename="S-FLEX">
        <ProfileProvider>
          <Header />
          <Routes>
            <Route element={<PrivateRoute userAuthentication={true} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/movies" element={<Home />} />
              <Route path="/tv" element={<TV />} />
              <Route path="/genre/movies" element={<GenreMovie />} />
              <Route path="/genre/tv" element={<GenreTv />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movies/:category/:movieId" element={<Home />} />
              <Route path="/tv/:category/:tvId" element={<TV />} />
              <Route path="/genre/movies/:movieId" element={<GenreMovie />} />
              <Route path="/genre/tv/:tvId" element={<GenreTv />} />
              <Route path="/search/movies/:movieId" element={<Search />} />
              <Route path="/search/tv/:tvId" element={<Search />} />
              <Route path="/search?keyword=:keyword" element={<Search />} />
              <Route path="/profil" element={<Profil />} />
            </Route>

            {/* Public routes without Header and Footer */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>

          <Footer />
        </ProfileProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
