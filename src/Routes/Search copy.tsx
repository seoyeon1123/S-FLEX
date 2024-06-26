import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getSearchs, ISearch, IGetSearchResult } from '../api';
import { makeImagePath } from '../utils';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

// Styled-components
const Wrapper = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #555;
`;

const Slider = styled.div`
  position: relative;
  width: 100vw;
  margin: 0 auto 20px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

const Section = styled.div`
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 40px;
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 20px;
`;

const SearchInfo = styled.div`
  height: 300px;
  background-color: rgba(86, 86, 86, 0.7);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 14px;
  color: ${(props) => props.theme.white.lighter};
  margin: 10px 0;
`;

const Cover = styled.div`
  width: 100%;
  height: 80%;
  background-size: cover;
  background-position: center center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const ViewDetail = styled.button`
  background-color: #e50914;
  color: #fff;
  border: none;
  width: 150px;
  height: 40px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin: 10px 0;

  &:hover {
    background-color: #bd081c;
  }
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
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
  transition: opacity 0.3s ease-in-out;

  h4 {
    font-size: 14px;
    color: #fff;
  }
`;

const SliderButton = styled.button`
  background-color: ${(props) => props.theme.white.lighter};
  color: #333;
  border: 1px solid #333;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
`;

// Main component
const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { data, isLoading } = useQuery<IGetSearchResult>(
    ['search', keyword],
    () => getSearchs(keyword || '')
  );

  const [movieIndex, setMovieIndex] = useState(0);
  const [tvIndex, setTvIndex] = useState(0);

  const navigateToDetail = (id: number, mediaType: string) => {
    navigate(`/${mediaType}/${id}`);
  };

  const maxItemsToShow = 6;

  const showNextMovies = () => {
    const totalMovies =
      data?.results.filter((item: ISearch) => item.media_type === 'movie')
        .length ?? 0;
    const maxIndex = Math.floor(totalMovies / maxItemsToShow);
    setMovieIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const showNextTvShows = () => {
    const totalTvShows =
      data?.results.filter((item: ISearch) => item.media_type === 'tv')
        .length ?? 0;
    const maxIndex = Math.floor(totalTvShows / maxItemsToShow);
    setTvIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Slider>
            <Section>
              <SectionTitle>Movies</SectionTitle>
              <AnimatePresence>
                <Row>
                  {data?.results
                    .filter((item: ISearch) => item.media_type === 'movie')
                    .slice(
                      movieIndex * maxItemsToShow,
                      movieIndex * maxItemsToShow + maxItemsToShow
                    )
                    .map((item: ISearch) => (
                      <Box
                        key={item.id}
                        bgPhoto={makeImagePath(item.backdrop_path)}
                        onMouseEnter={() => console.log('Mouse Enter')}
                        onMouseLeave={() => console.log('Mouse Leave')}
                      >
                        <Info>
                          <h4>{item.title}</h4>
                          <ViewDetail
                            onClick={() => navigateToDetail(item.id, 'movie')}
                          >
                            View Details
                          </ViewDetail>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
              <SliderButton onClick={showNextMovies}>Next Movies</SliderButton>
            </Section>
          </Slider>

          <Slider>
            <Section>
              <SectionTitle>TV Shows</SectionTitle>
              <AnimatePresence>
                <Row>
                  {data?.results
                    .filter((item: ISearch) => item.media_type === 'tv')
                    .slice(
                      tvIndex * maxItemsToShow,
                      tvIndex * maxItemsToShow + maxItemsToShow
                    )
                    .map((item: ISearch) => (
                      <Box
                        key={item.id}
                        bgPhoto={makeImagePath(item.backdrop_path)}
                        onMouseEnter={() => console.log('Mouse Enter')}
                        onMouseLeave={() => console.log('Mouse Leave')}
                      >
                        <Info>
                          <h4>{item.name}</h4>
                          <ViewDetail
                            onClick={() => navigateToDetail(item.id, 'tv')}
                          >
                            View Details
                          </ViewDetail>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
              <SliderButton onClick={showNextTvShows}>
                Next TV Shows
              </SliderButton>
            </Section>
          </Slider>
        </>
      )}
    </Wrapper>
  );
};

export default Search;
