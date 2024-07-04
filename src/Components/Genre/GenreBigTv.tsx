import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import { IGetVideosResult, getTvVideos } from '../../Api/Api';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import Video from '../Video';
import { makeImagePath } from '../../utils';
import { IGetTvDetail, getTvDetail } from '../../Api/TvApi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1000; /* Ensure it's above other content */
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  top: -50px;
  z-index: 2000; /* Ensure GenreBigMovie appears above SliderGenre */
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
  color: ${(props) => props.theme.white.lighter};
  width: 70%;
`;

const BigVoteAverage = styled.div`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  padding: 20px;
  top: -50px;
`;

const BigRelease = styled.div`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  padding: 20px;
  top: -50px;
`;

const GenreTitle = styled.h3`
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.black.darker};
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: inline-block;
  background-color: ${(props) => props.theme.black.veryDark};
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Detail = styled.div`
  padding-top: 15px;
  text-align: start;
  margin-right: 10px;
  flex: 1;
`;

const ExplanationSub = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: absolute;
  width: 100%;
  top: 450px;
  margin: 0 auto;
`;

const RunTime = styled.h4`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  padding: 20px;
  top: -50px;
`;

interface IGenreBigMovieProps {
  tvId: number;
  layoutId: string;
}

const Type = styled.p`
  margin-top: 10px;
  background-color: #ff6060;
  font-size: 15px;
  padding: 5px;
  width: 130px;
`;

const GenreBigTv = ({ tvId, layoutId }: IGenreBigMovieProps) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bigMovieMatch = useMatch('/genre/tv/:tvId');

  const { data: tvDetail } = useQuery<IGetTvDetail>('detail', () =>
    getTvDetail(tvId ? tvId.toString() : '')
  );

  const [videoData, setVideoData] = useState<IGetVideosResult>();

  useEffect(() => {
    const fetchVideoData = async () => {
      if (tvId) {
        const videoData = await getTvVideos(tvId + '');
        setVideoData(videoData);
      }
    };
    fetchVideoData();
  }, [tvId]);

  const clickedMovie = tvId && tvDetail && tvDetail.id === tvId;

  const onOverlayClicked = () => {
    navigate('/genre/tv');
  };

  return (
    <>
      <Container>
        <AnimatePresence>
          {bigMovieMatch && clickedMovie ? (
            <>
              <Overlay
                onClick={onOverlayClicked}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <BigMovie
                layoutId={tvId.toString()} // movieId로 layoutId 설정
                style={{ top: scrollY.get() + 100 }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.3 },
                }}
                exit={{ opacity: 0 }}
              >
                {videoData && videoData.results.length > 0 ? (
                  <Video videos={videoData.results} />
                ) : (
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top , black, transparent), url(${makeImagePath(
                        tvDetail.backdrop_path,
                        'w500'
                      )})`,
                    }}
                  />
                )}
                <BigTitle>{tvDetail.name}</BigTitle>
                <Explanation>
                  <BigRelease>
                    {tvDetail?.first_air_date.slice(0, 4) +
                      ' ' +
                      tvDetail?.first_air_date.slice(5, 7)}
                  </BigRelease>
                  {tvDetail &&
                  tvDetail.episode_run_time &&
                  tvDetail.episode_run_time + '' !== '' ? (
                    <RunTime>{tvDetail.episode_run_time}분</RunTime>
                  ) : null}
                  <BigVoteAverage>
                    ⭐️ {Number(tvDetail.vote_average).toFixed(2)}
                  </BigVoteAverage>
                </Explanation>
                <ExplanationSub>
                  <BigOverview>{tvDetail.overview}</BigOverview>
                  <Detail>
                    {tvDetail && tvDetail.genres
                      ? tvDetail.genres.map((genre) => (
                          <GenreTitle key={genre.id}>{genre.name}</GenreTitle>
                        ))
                      : null}
                    <Type>Type : {tvDetail?.type}</Type>
                  </Detail>
                </ExplanationSub>
              </BigMovie>
            </>
          ) : null}
        </AnimatePresence>
      </Container>
    </>
  );
};

export default GenreBigTv;
