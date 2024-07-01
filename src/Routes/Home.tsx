import { useQuery } from 'react-query';
import { getDistinctMovies } from '../MovieApi';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import Movie from '../Components/Movie';

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0)
    ),
    linear-gradient(to left, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 50%;
`;

const Home = () => {
  const { data, isLoading } = useQuery(
    ['movies', 'distinct'],
    getDistinctMovies
  );

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          // data가 존재하는 경우
          <>
            <Banner
              bgPhoto={makeImagePath(data?.nowPlaying[0].backdrop_path || '')}
            >
              <Title>{data?.nowPlaying[0].title}</Title>
              <Overview>{data?.nowPlaying[0].overview}</Overview>
            </Banner>

            <Movie />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;
