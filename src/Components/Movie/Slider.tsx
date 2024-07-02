import { IMovie } from '../../Api/MovieApi';
import styled from 'styled-components';
import { makeImagePath } from '../../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Slider = styled.div`
  position: relative;
  top: -280px;
  width: 80vw;
  margin-bottom: 100px;
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

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: -280px;
  margin-top: 130px;
`;

const SectionTitle = styled.h1`
  margin: 20px 60px;
  margin-left: 0;
  font-size: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
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

const offset = 6;

interface SliderComponentProps {
  title: string;
  movies: IMovie[];
  category: string;
}

const SliderComponent = ({ title, movies, category }: SliderComponentProps) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(true);
  const increaseIndex = () => {
    if (movies) {
      if (leaving) return;
      const totalMovies = movies.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setDirection(true);
      toggleLeaving();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (movies) {
      if (leaving) return;
      const totalMovies = movies.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;

      setDirection(false);
      toggleLeaving();
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onBoxClicked = async (movieId: number) => {
    navigate(`/movies/${category}/${movieId}`);
  };

  return (
    <>
      <TitleArea>
        <SectionTitle>{title}</SectionTitle>
        <ButtonWrapper>
          <Button onClick={decreaseIndex}>이전</Button>
          <Button onClick={increaseIndex}>다음</Button>
        </ButtonWrapper>
      </TitleArea>
      <Slider>
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
            custom={direction} // Pass the direction to variants
            transition={{ type: 'tween', duration: 1 }}
          >
            {movies
              .slice(offset * index, offset * index + offset)
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
    </>
  );
};

export default SliderComponent;
