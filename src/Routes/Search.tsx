import React, { useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  getSearchs,
  ISearch,
  IGetSearchResult,
  IGetVideosResult,
} from '../Api/Api';
import { makeImagePath } from '../utils';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Video from '../Components/Video';
import SearchSlider from './SearchSlider';
import Loading from '../Components/Loading/Loading';

const Wrapper = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 40px;
  color: ${(props) => props.theme.white.darker};
  margin-bottom: 20px;
  text-align: start;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 10000;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 20px;
  position: relative;
  top: -60px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -50px;
  color: ${(props) => props.theme.white.lighter};
`;

const bigModal = {
  initial: { scale: 0.5 },
  show: { scale: 1, transition: { duration: 1 } },
  exit: { scale: 0.5, transition: { duration: 0.5, delay: 0.5 } },
};

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bigMovieMatch = useMatch('/search/movies/:movieId');
  const bigTvShowMatch = useMatch('/search/tv/:tvId');
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { data, isLoading } = useQuery<IGetSearchResult>(
    ['search', keyword],
    () => getSearchs(keyword || '')
  );

  const tvData = data?.results.filter(
    (item: ISearch) => item.media_type === 'tv'
  );

  const movieData = data?.results.filter(
    (item: ISearch) => item.media_type === 'movie'
  );

  const [videoData, setVideoData] = useState<IGetVideosResult | null>(null);

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + '' === bigMovieMatch.params.movieId
    );
  const clickedTv =
    bigTvShowMatch?.params.tvId &&
    data?.results.find((tv) => tv.id + '' === bigTvShowMatch.params.tvId);

  const onOverlayClicked = () => {
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <SectionTitle>{keyword} 검색 결과를 찾았어요!</SectionTitle>

          {data && (
            <>
              <SearchSlider title="Movie" search={movieData || []} />
              <SearchSlider title="Tv" search={tvData || []} />
            </>
          )}

          <AnimatePresence>
            {bigMovieMatch && clickedMovie && (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  variants={bigModal}
                  initial="initial"
                  animate="show"
                  exit="exit"
                  transition={{ duration: 1 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {videoData && videoData.results.length > 0 ? (
                    <Video videos={videoData.results} />
                  ) : (
                    <BigCover
                      style={{
                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                          clickedMovie.backdrop_path
                        )})`,
                      }}
                    />
                  )}
                  <BigTitle>{clickedMovie.title}</BigTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </BigMovie>
              </>
            )}

            {bigTvShowMatch && clickedTv && (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  variants={bigModal}
                  initial="initial"
                  animate="show"
                  exit="exit"
                  transition={{ duration: 1 }}
                  layoutId={bigTvShowMatch.params.tvId}
                >
                  {videoData && videoData.results.length > 0 ? (
                    <Video videos={videoData.results} />
                  ) : (
                    <BigCover
                      style={{
                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                          clickedTv.backdrop_path
                        )})`,
                      }}
                    />
                  )}
                  <BigTitle>{clickedTv.name}</BigTitle>
                  <BigOverview>{clickedTv.overview}</BigOverview>
                </BigMovie>
              </>
            )}
          </AnimatePresence>
        </Wrapper>
      )}
    </>
  );
};

export default Search;
