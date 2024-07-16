import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import { IDetail, getMovieDetail } from '../../Api/MovieApi';
import { IGetVideosResult, getVideos } from '../../Api/Api';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import Video from '../Video';
import { makeImagePath } from '../../utils';

interface IGetMovieGenre {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  runtime: number;
  tagline: string;
  genres: IDetail[];
  release_date: string;
  vote_average: number;
}

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

const TagLine = styled.h3`
  font-size: 15px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  margin-top: 10px;
  text-align: start;
  background-color: ${(props) => props.theme.black.veryDark};
  width: 180px;
`;

interface IGenreBigMovieProps {
  movieId: number;
  layoutId: string;
}

const GenreBigMovie = ({ movieId, layoutId }: IGenreBigMovieProps) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bigMovieMatch = useMatch('/genre/movies/:movieId');

  const { data: movieDetail } = useQuery<IGetMovieGenre>('detail', () =>
    getMovieDetail(movieId ? movieId.toString() : '')
  );

  const [videoData, setVideoData] = useState<IGetVideosResult>();

  useEffect(() => {
    const fetchVideoData = async () => {
      if (movieId) {
        try {
          const videoData = await getVideos(movieId + '');
          setVideoData(videoData);
        } catch (error) {
          console.error('Error fetching video data:', error);
        }
      }
    };

    fetchVideoData();
  }, [movieId]);

  const clickedMovie = movieId && movieDetail && movieDetail.id === movieId;

  const onOverlayClicked = () => {
    navigate('/genre/movies'); // 혹은 다른 경로로 이동하도록 설정
  };

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}시간 ${minutes}분`;
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
                layoutId={movieId.toString()} // movieId로 layoutId 설정
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
                        movieDetail.backdrop_path,
                        'w500'
                      )})`,
                    }}
                  />
                )}
                <BigTitle>{movieDetail.title}</BigTitle>
                <Explanation>
                  <BigRelease>
                    {movieDetail.release_date &&
                      `${movieDetail.release_date.slice(
                        0,
                        4
                      )} ${movieDetail.release_date.slice(5, 7)}`}
                  </BigRelease>
                  {movieDetail.runtime && (
                    <RunTime>{formatRuntime(movieDetail.runtime)}</RunTime>
                  )}
                  <BigVoteAverage>
                    ⭐️ {Number(movieDetail.vote_average).toFixed(2)}
                  </BigVoteAverage>
                </Explanation>
                <ExplanationSub>
                  <BigOverview>{movieDetail.overview}</BigOverview>
                  <Detail>
                    {movieDetail && movieDetail.genres
                      ? movieDetail.genres.map((genre) => (
                          <GenreTitle key={genre.id}>{genre.name}</GenreTitle>
                        ))
                      : null}
                    {movieDetail.tagline && (
                      <TagLine>{movieDetail.tagline}</TagLine>
                    )}
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

export default GenreBigMovie;
