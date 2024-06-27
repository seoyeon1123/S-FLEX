import React, { useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  getSearchs,
  ISearch,
  IGetSearchResult,
  IGetVideosResult,
  getVideos,
} from '../api';
import { makeImagePath } from '../utils';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Video from '../Components/Video';

const Wrapper = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: flex-start;
`;

const SliderButton = styled.button`
  background-color: rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.white.darker};
  border: 1px solid transparent;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  position: relative;

  &:hover {
    background-color: ${(props) => props.theme.black.darker};
  }

  &:active {
    background-color: ${(props) => props.theme.black.lighter};
  }
`;

const SectionTitle = styled.h2`
  font-size: 40px;
  color: ${(props) => props.theme.white.darker};
  margin-bottom: 20px;
  margin-right: 30px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
`;

const Section = styled.div`
  width: 100%;
  min-height: 350px;
  margin-bottom: 80px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-color: ${(props) => props.theme.black.lighter};
  height: 200px;
  background-size: cover;
  background-position: center center;
  font-size: 55px;
  cursor: pointer;
  position: relative;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  h4 {
    font-size: 14px;
    color: #fff;
  }
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

const Hr = styled.hr`
  border: none;
  height: 3px;
  background: rgba(102, 102, 102, 0.8);
  margin: 20px 0;
`;

const rowVariants = {
  hidden: { x: window.outerWidth + 5, opacity: 0 },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type: 'tween', duration: 1 },
  },
  exit: {
    x: -window.outerWidth - 5,
    y: 0,
    opacity: 0,
    transition: { type: 'tween', duration: 1 },
  },
};

const BoxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    zIndex: 1000,
    y: -50,
    transition: { type: 'tween', duration: 0.5, delay: 0.5 },
  },
  exit: { transition: { duration: 1 } },
};

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

  const [movieIndex, setMovieIndex] = useState(0);
  const [tvIndex, setTvIndex] = useState(0);
  const maxItemsToShow = 6;

  const showNextMovies = () => {
    const totalMovies =
      data?.results.filter((item: ISearch) => item.media_type === 'movie')
        .length ?? 0;
    const maxIndex = Math.floor(totalMovies / maxItemsToShow) - 1;

    if (totalMovies <= 6) {
      return;
    }

    setMovieIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const showNextTvShows = () => {
    const totalTvShows =
      data?.results.filter((item: ISearch) => item.media_type === 'tv')
        .length ?? 0;
    const maxIndex = Math.floor(totalTvShows / maxItemsToShow) - 1;

    if (totalTvShows <= 6) {
      return;
    }

    setTvIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const [videoData, setVideoData] = useState<IGetVideosResult | null>(null);

  const onBoxClickedMovie = async (movieId: number) => {
    try {
      navigate(`/search/movies/${movieId}?keyword=${keyword}`);
      const data = await getVideos(movieId.toString());
      setVideoData(data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };

  const onBoxClickedTv = (tvId: number) => {
    navigate(`/search/tv/${tvId}?keyword=${keyword}`);
  };

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
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Section>
            <SectionTitle>검색 결과 : {keyword}</SectionTitle>
            <Hr />
            <TitleArea>
              <SectionTitle>Movies</SectionTitle>
              <SliderButton onClick={showNextMovies}>Next Movies</SliderButton>
            </TitleArea>

            <AnimatePresence initial={false}>
              <Row
                key={movieIndex}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
              >
                {data?.results
                  .filter((item: ISearch) => item.media_type === 'movie')
                  .slice(
                    movieIndex * maxItemsToShow,
                    movieIndex * maxItemsToShow + maxItemsToShow
                  )
                  .map((item: ISearch) => (
                    <Box
                      transition={{ type: 'tween' }}
                      variants={BoxVariants}
                      whileHover="hover"
                      initial="normal"
                      exit="exit"
                      layoutId={item.id + ''}
                      key={item.id}
                      bgPhoto={makeImagePath(item.backdrop_path)}
                      onClick={() => onBoxClickedMovie(item.id)}
                    />
                  ))}
              </Row>
            </AnimatePresence>
          </Section>

          <Section>
            <TitleArea>
              <SectionTitle>Tv Shows</SectionTitle>
              <SliderButton onClick={showNextTvShows}>
                Next Tv Shows
              </SliderButton>
            </TitleArea>
            <AnimatePresence initial={false}>
              <Row
                key={tvIndex}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
              >
                {data?.results
                  .filter((item: ISearch) => item.media_type === 'tv')
                  .slice(
                    tvIndex * maxItemsToShow,
                    tvIndex * maxItemsToShow + maxItemsToShow
                  )
                  .map((item: ISearch) => (
                    <Box
                      transition={{ type: 'tween' }}
                      variants={BoxVariants}
                      whileHover="hover"
                      initial="normal"
                      layoutId={item.id + ''}
                      key={item.id}
                      bgPhoto={makeImagePath(item.backdrop_path)}
                      onClick={() => onBoxClickedTv(item.id)}
                    >
                      <Info>
                        <h4>{item.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Section>

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
        </>
      )}
    </Wrapper>
  );
};

export default Search;
