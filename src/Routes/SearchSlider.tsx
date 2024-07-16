import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ISearch } from '../Api/Api';
import { makeImagePath } from '../utils';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
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
  margin-bottom: 20px;
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
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    zIndex: 1000,
    y: -50,
    transition: { type: 'tween', duration: 0.5, delay: 0.5 },
  },
  exit: { transition: { duration: 1 } },
};

interface ISearchSliderProps {
  title: string;
  search: ISearch[];
}

const SearchSlider = ({ title, search }: ISearchSliderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(true);

  const maxItemsToShow = 6;

  const increaseIndex = () => {
    if (search) {
      const totalMovies = search.length;
      const maxIndex = Math.floor(totalMovies / maxItemsToShow) - 1;

      if (totalMovies <= maxItemsToShow) {
        return;
      }
      setDirection(true);
      setIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
    }
  };

  const decreaseIndex = () => {
    if (search) {
      const totalMovies = search.length;
      const maxIndex = Math.ceil(totalMovies / maxItemsToShow) - 1;

      setDirection(false);
      setIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
    }
  };

  const onBoxClicked = (itemId: number, mediaType: string) => {
    navigate(`/search/${mediaType}/${itemId}?keyword=${keyword}`);
  };

  return (
    <>
      <Section>
        <TitleArea>
          <SectionTitle>{title}</SectionTitle>
          <ButtonWrapper>
            <Button onClick={decreaseIndex}>이전</Button>
            <Button onClick={increaseIndex}>다음</Button>
          </ButtonWrapper>
        </TitleArea>
        <AnimatePresence initial={false} custom={direction}>
          <Row
            key={index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={direction}
            transition={{ type: 'tween', duration: 1 }}
          >
            {search

              .slice(
                index * maxItemsToShow,
                index * maxItemsToShow + maxItemsToShow
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
                  onClick={() => onBoxClicked(item.id, item.media_type)}
                />
              ))}
          </Row>
        </AnimatePresence>
      </Section>
    </>
  );
};

export default SearchSlider;
