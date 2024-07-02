import { useQuery } from 'react-query';
import { getDistinctTvs } from '../Api/TvApi';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import TvComponent from '../Components/Tv/TvComponent';

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

const TV = () => {
  const { data, isLoading } = useQuery(['tvs', 'distinct'], getDistinctTvs);
  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader> Loading... </Loader>
        ) : (
          <>
            <Banner
              bgPhoto={makeImagePath(data?.popular[0].backdrop_path || '')}
            >
              <Title>{data?.popular[0].name}</Title>
              <Overview>{data?.popular[0].overview}</Overview>
            </Banner>
            <TvComponent />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default TV;
