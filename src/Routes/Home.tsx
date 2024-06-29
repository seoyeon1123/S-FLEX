import { useQuery } from 'react-query';
import { getDistinctMovies, IGetMoviesResult } from '../MovieApi';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import NowPlaying from '../Components/NowPlaying';
import Upcoming from '../Components/Upcoming';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
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
  const { data, isLoading } = useQuery<{ nowPlaying: IGetMoviesResult }>(
    ['movies', 'distinct'],
    getDistinctMovies
  );

  const nowPlayingData = data?.nowPlaying;

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : nowPlayingData ? ( // data가 존재하는 경우
          <>
            <Banner
              bgPhoto={makeImagePath(
                nowPlayingData.results[0]?.backdrop_path || ''
              )}
            >
              <Title>{nowPlayingData.results[0]?.title}</Title>
              <Overview>{nowPlayingData.results[0]?.overview}</Overview>
            </Banner>

            <NowPlaying data={nowPlayingData} />
            <Upcoming />
          </>
        ) : null}{' '}
      </Wrapper>
    </>
  );
};

export default Home;
