import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getSearchs, ISearch, IGetSearchResult } from '../api'; // Assuming `getSearchs` and `ISearch` are imported correctly
import { makeImagePath } from '../utils';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #555;
`;

const Container = styled.div`
  max-width: 100vw;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Section = styled.div`
  width: calc(
    50% - 10px
  ); /* Adjusted width to make two sections fit side by side */
  margin-right: 20px; /* Added margin between sections */
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 20px;
`;

const SearchInfo = styled.div`
  margin-bottom: 40px;
  height: 500px;
  background-color: rgba(86, 86, 86, 0.7);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.white.lighter};
  margin: 20px 20px 20px 0;
  flex: 1;
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
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin: 20px 20px 20px 0;

  &:hover {
    background-color: #bd081c;
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
  margin-top: 20px;
`;

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
    const maxIndex = Math.ceil(totalMovies / maxItemsToShow);
    setMovieIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const showNextTvShows = () => {
    const totalTvShows =
      data?.results.filter((item: ISearch) => item.media_type === 'tv')
        .length ?? 0;
    const maxIndex = Math.ceil(totalTvShows / maxItemsToShow);
    setTvIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Container>
          <Section>
            <SectionTitle>Movies</SectionTitle>
            {data?.results
              .filter((item: ISearch) => item.media_type === 'movie')
              .slice(
                movieIndex * maxItemsToShow,
                movieIndex * maxItemsToShow + maxItemsToShow
              )
              .map((item: ISearch) => (
                <SearchInfo key={item.id}>
                  <Cover
                    style={{
                      backgroundImage: `url(${makeImagePath(
                        item.backdrop_path
                      )})`,
                    }}
                  />
                  <Title>{item.title}</Title>
                  <div>{item.vote_average}</div>
                  <ViewDetail
                    onClick={() => navigateToDetail(item.id, 'movie')}
                  >
                    View Details
                  </ViewDetail>
                </SearchInfo>
              ))}
            {data?.results &&
              data.results.filter(
                (item: ISearch) => item.media_type === 'movie'
              ).length >
                (movieIndex + 1) * maxItemsToShow && (
                <SliderButton onClick={showNextMovies}>
                  Next Movies
                </SliderButton>
              )}
          </Section>

          <Section>
            <SectionTitle>TV Shows</SectionTitle>
            {data?.results && data.results.length > 0 ? (
              data.results
                .filter((item: ISearch) => item.media_type === 'tv')
                .slice(
                  tvIndex * maxItemsToShow,
                  tvIndex * maxItemsToShow + maxItemsToShow
                )
                .map((item: ISearch) => (
                  <SearchInfo key={item.id}>
                    <Cover
                      style={{
                        backgroundImage: `url(${makeImagePath(
                          item.poster_path
                        )})`,
                      }}
                    />
                    <Title>{item.name}</Title>
                    <div>{item.vote_average}</div>
                    <ViewDetail onClick={() => navigateToDetail(item.id, 'tv')}>
                      View Details
                    </ViewDetail>
                  </SearchInfo>
                ))
            ) : (
              <div>No TV shows found.</div>
            )}
            {data?.results &&
              data.results.filter((item: ISearch) => item.media_type === 'tv')
                .length >
                (tvIndex + 1) * maxItemsToShow && (
                <SliderButton onClick={showNextTvShows}>
                  Next TV Shows
                </SliderButton>
              )}
          </Section>
        </Container>
      )}
    </Wrapper>
  );
};

export default Search;
