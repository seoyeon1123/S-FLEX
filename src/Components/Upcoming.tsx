import { useQuery } from 'react-query';
import { getDistinctMovies } from '../MovieApi';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

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
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
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

const Upcoming = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bigMovieMatch = useMatch('/movies/:movieId');
  const [upComingIndex, setUpComingIndex] = useState(0);
  const [upcomingLeaving, setUpcomingLeaving] = useState(false);

  const { data, isLoading } = useQuery(
    ['movies', 'distinct'],
    getDistinctMovies
  );

  const increaseUpcomingIndex = () => {
    if (data) {
      if (upcomingLeaving) return;
      const totalMovies = data.upcoming.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1; //올림처리

      toggleUpcomingLeaving();
      setUpComingIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseUpcomingIndex = () => {
    if (data) {
      if (upcomingLeaving) return;
      const totalMovies = data.upcoming.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1; //올림처리

      toggleUpcomingLeaving();
      setUpComingIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleUpcomingLeaving = () => {
    setUpcomingLeaving((prev) => !prev);
  };

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.upcoming.find(
      (movie) => movie.id + '' === bigMovieMatch.params.movieId
    );

  const onOverlayClicked = () => {
    navigate('/');
  };

  return (
    <>
      <TitleArea>
        <SectionTitle>Up Coming</SectionTitle>
        <ButtonWrapper>
          <Button onClick={decreaseUpcomingIndex}>이전</Button>
          <Button onClick={increaseUpcomingIndex}>다음</Button>
        </ButtonWrapper>
      </TitleArea>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleUpcomingLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={upComingIndex}
            transition={{ type: 'tween', duration: 1 }}
          >
            {data?.upcoming
              .slice(1)
              .slice(offset * upComingIndex, offset * upComingIndex + offset)
              .map((upcomingMovie) => (
                <Box
                  layoutId={upcomingMovie.id + ''}
                  onClick={() => onBoxClicked(upcomingMovie.id)}
                  transition={{ type: 'tween' }}
                  variants={BoxVariants}
                  whileHover="hover"
                  initial="normal"
                  key={upcomingMovie.id}
                  bgPhoto={makeImagePath(upcomingMovie.backdrop_path, 'w500')}
                >
                  <Info variants={infoVariants}>
                    <h4>{upcomingMovie.title}</h4>
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
              animate={{ opacity: 1 }}
            />
            <BigMovie
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
    </>
  );
};

export default Upcoming;
