import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import { IGetMoviesResult, IMovie } from '../MovieApi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const Slider = styled.div`
  position: relative;
  top: -200px;
  margin-bottom: 100px; /* 슬라이더 간격 조정 */
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100vw;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  height: 200px;
  background-size: cover;
  background-position: center center;
  font-size: 55px;
  cursor: pointer;

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

  h4 {
    font-size: 14px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 2;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  border-radius: 15px;
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

const SectionTitle = styled.h1`
  margin: 20px 60px;
  margin-left: 0;
  font-size: 40px;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: -200px;
`;

const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    zIndex: 1000,
    y: -50,
    transition: { type: 'tween', duration: 0.3, delay: 0.5 },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { type: 'tween', duration: 0.3, delay: 0.5 },
  },
};

const offset = 6;

interface INowPlaying {
  data: IGetMoviesResult;
}

const NowPlaying = ({ data }: INowPlaying) => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch('/movies/:movieId');
  const { scrollY } = useScroll();
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  const [nowPlayingLeaving, setNowPlayingLeaving] = useState(false);

  const increaseNowPlayingIndex = () => {
    if (data) {
      if (nowPlayingLeaving) return;
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      toggleNowPlayingLeaving();
      setNowPlayingIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseNowPlayingIndex = () => {
    if (data) {
      if (nowPlayingLeaving) return;
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      toggleNowPlayingLeaving();
      setNowPlayingIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleNowPlayingLeaving = () => {
    setNowPlayingLeaving((prev) => !prev);
  };

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const onOverlayClicked = () => {
    navigate('/');
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data.results.find(
      (movie) => movie.id + '' === bigMovieMatch.params.movieId
    );

  return (
    <>
      <Container>
        <TitleArea>
          <SectionTitle>Now Playing</SectionTitle>
          <ButtonWrapper>
            <Button onClick={decreaseNowPlayingIndex}>이전</Button>
            <Button onClick={increaseNowPlayingIndex}>다음</Button>
          </ButtonWrapper>
        </TitleArea>

        <Slider>
          <AnimatePresence
            initial={false}
            onExitComplete={toggleNowPlayingLeaving}
          >
            <Row
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={nowPlayingIndex}
              transition={{ type: 'tween', duration: 1 }}
            >
              {data?.results
                .slice(1)
                .slice(
                  offset * nowPlayingIndex,
                  offset * nowPlayingIndex + offset
                )
                .map((movie) => (
                  <Box
                    layoutId={movie.id + ''}
                    onClick={() => onBoxClicked(movie.id)}
                    transition={{ type: 'tween' }}
                    variants={BoxVariants}
                    whileHover="hover"
                    initial="normal"
                    key={movie.id}
                    bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </Slider>

        <AnimatePresence>
          {bigMovieMatch ? (
            <>
              <Overlay
                onClick={onOverlayClicked}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />

              <BigMovie
                key={bigMovieMatch.params.movieId}
                style={{ top: scrollY.get() + 100 }}
                layoutId={bigMovieMatch.params.movieId}
              >
                {clickedMovie && (
                  <>
                    <BigCover
                      style={{
                        backgroundImage: `linear-gradient(to top , black, transparent), url(${makeImagePath(
                          clickedMovie.backdrop_path,
                          'w500'
                        )})`,
                      }}
                    />
                    <BigTitle>{clickedMovie.title}</BigTitle>
                    <BigOverview>{clickedMovie.overview}</BigOverview>
                  </>
                )}
              </BigMovie>
            </>
          ) : null}
        </AnimatePresence>
      </Container>
    </>
  );
};

export default NowPlaying;
