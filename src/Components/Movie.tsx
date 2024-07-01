import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import {
  IGetMovieDetail,
  getDistinctMovies,
  getMovieDetail,
} from '../MovieApi';
import SliderComponent from './Slider';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useNavigate, useMatch } from 'react-router-dom';
import { IMovie } from '../MovieApi';
import Video from './Video';
import { IGetVideosResult, getVideos } from '../api';
import { makeImagePath } from '../utils';
import { nowPlayingFont, topRankedFont, upcomingFont } from './CategoryFont';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
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
  width: 70%; /* Fixed width for BigOverview */
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

const CategoryLabel = styled.div`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -50px;
  padding: 20px;
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
  flex: 1; /* Fill remaining space in ExplanationSub */
`;

const GenreTitle = styled.h3`
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.black.darker};
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 5px;
  display: inline-block;
  background-color: ${(props) => props.theme.black.veryDark};
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
  font-size: 15px;
  margin-top: 10px;
`;

const TagLine = styled.h3`
  font-size: 30px;
  color: ${(props) => props.theme.red};
  position: relative;
  top: 130px;
  margin: 20px 10px;
  text-align: center;
`;

const Movie = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bigMovieMatch = useMatch('/movies/:category/:movieId');
  const movieId = bigMovieMatch?.params.movieId;
  const category = bigMovieMatch?.params.category;

  const { data, isLoading } = useQuery('distinctMovies', getDistinctMovies);
  const [videoData, setVideoData] = useState<IGetVideosResult>();
  const { data: movieDetail } = useQuery<IGetMovieDetail>(
    ['detail', movieId],
    () => getMovieDetail(movieId || '')
  );

  const onOverlayClicked = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      if (movieId) {
        try {
          const videoData = await getVideos(movieId);
          setVideoData(videoData);
        } catch (error) {
          console.error('Error fetching video data:', error);
        }
      }
    };

    fetchVideoData();
  }, [movieId]);

  const clickedMovie =
    movieId &&
    data &&
    category &&
    data[category as keyof typeof data]?.find(
      (movie: IMovie) => movie.id + '' === movieId
    );

  return (
    <Container>
      {data && (
        <>
          <SliderComponent
            title="Now Playing"
            movies={data.nowPlaying}
            category="nowPlaying"
          />
          <SliderComponent
            title="Upcoming"
            movies={data.upcoming}
            category="upcoming"
          />
          <SliderComponent
            title="Top Rated"
            movies={data.topRanked}
            category="topRanked"
          />
        </>
      )}
      <AnimatePresence>
        {bigMovieMatch && clickedMovie ? (
          <>
            <Overlay
              onClick={onOverlayClicked}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie style={{ top: scrollY.get() + 100 }} layoutId={movieId}>
              {clickedMovie && videoData && videoData.results.length > 0 ? (
                <Video videos={videoData.results} />
              ) : (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top , black, transparent), url(${makeImagePath(
                        clickedMovie!.backdrop_path,
                        'w500'
                      )})`,
                    }}
                  />
                </>
              )}
              <BigTitle>{clickedMovie.title}</BigTitle>
              <Explanation>
                <CategoryLabel>
                  {category === 'nowPlaying' && nowPlayingFont}
                  {category === 'upcoming' && upcomingFont}
                  {category === 'topRanked' && topRankedFont}
                </CategoryLabel>
                <BigRelease>
                  {clickedMovie.release_date.slice(0, 4) +
                    ' ' +
                    clickedMovie.release_date.slice(5, 7)}
                </BigRelease>
                <BigVoteAverage>
                  ⭐️ {Number(clickedMovie.vote_average).toFixed(2)}
                </BigVoteAverage>
              </Explanation>
              <ExplanationSub>
                <BigOverview>{clickedMovie.overview}</BigOverview>
                {movieDetail && (
                  <Detail>
                    장르 :
                    {movieDetail.genres.map((genre) => (
                      <GenreTitle key={genre.id}> {genre.name}</GenreTitle>
                    ))}
                    <RunTime>RunTime : {movieDetail.runtime} </RunTime>
                  </Detail>
                )}
              </ExplanationSub>
              {movieDetail && movieDetail.tagline && (
                <TagLine>{movieDetail.tagline}</TagLine>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </Container>
  );
};

export default Movie;
