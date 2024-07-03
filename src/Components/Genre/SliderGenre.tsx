import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { IGenreMovie } from '../../Api/GenreApi';
import GenreBigMovie from './GenreBigMovie'; // Assuming GenreBigMovie is correctly imported
import { makeImagePath } from '../../utils';
import Video from '../Video';

const Slider = styled(motion.div)`
  position: relative;
  width: 100vw;
  margin-bottom: 100px;
  z-index: 1;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  height: 200px;
  background-size: cover;
  background-position: center center;
  font-size: 55px;
  cursor: pointer;
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

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-top: 170px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.black.lighter};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const GenreTitle = styled(motion.h1)`
  margin: 20px 60px;
  margin-left: 0;
  font-size: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const rowVariants = {
  hidden: (direction: boolean) => ({
    x: direction ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: boolean) => ({
    x: direction ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
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

const titleVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const sliderVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 1,
    },
  },
};

const offset = 6;

interface SliderComponentProps {
  movies: IGenreMovie[];
  genre: string;
  onMovieClick: (movieId: number) => void;
}

const SliderGenre = ({ movies, genre, onMovieClick }: SliderComponentProps) => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch('/genre/movies/:movieId');
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(true);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [showBigMovie, setShowBigMovie] = useState(false); // 추가: BigMovie를 보여줄지 여부

  const increaseIndex = () => {
    if (leaving) return;
    const totalMovies = movies.length - 1;
    const maxIndex = Math.ceil(totalMovies / offset) - 1;

    setDirection(true);
    toggleLeaving();
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const decreaseIndex = () => {
    if (leaving) return;
    const totalMovies = movies.length - 1;
    const maxIndex = Math.ceil(totalMovies / offset) - 1;

    setDirection(false);
    toggleLeaving();
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onBoxClicked = async (movieId: number) => {
    navigate(`/genre/movies/${movieId}`);
    setMovieId(movieId);
    setShowBigMovie(true); // BigMovie를 보여줄 상태로 설정
  };

  return (
    <>
      <AnimatePresence>
        {bigMovieMatch && movieId && showBigMovie ? ( // showBigMovie 상태 추가
          <>
            <GenreBigMovie layoutId={movieId.toString()} movieId={movieId} />
          </>
        ) : null}
      </AnimatePresence>

      <TitleArea>
        <GenreTitle
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          S-FLEX가 추천하는 {genre} 영화는 ?
        </GenreTitle>
        <ButtonWrapper>
          <Button onClick={decreaseIndex}>이전</Button>
          <Button onClick={increaseIndex}>다음</Button>
        </ButtonWrapper>
      </TitleArea>
      <Slider variants={sliderVariants} initial="initial" animate="animate">
        <AnimatePresence
          initial={false}
          custom={direction}
          onExitComplete={toggleLeaving}
        >
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={index}
            custom={direction}
            transition={{ type: 'tween', duration: 1 }}
          >
            {movies
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id.toString()}
                  onClick={() => {
                    onMovieClick(movie.id);
                    onBoxClicked(movie.id);
                  }}
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
    </>
  );
};

export default SliderGenre;
