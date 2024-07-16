import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import SliderTv from './SliderTv';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useNavigate, useMatch } from 'react-router-dom';
import Video from '../Video';
import { IGetVideosResult, getTvVideos } from '../../Api/Api';
import { makeImagePath } from '../../utils';
import {
  IGetTvDetail,
  ISeason,
  getDistinctTvs,
  getTvDetail,
} from '../../Api/TvApi';
import SeasonSelector from './SeasonSelector';
import { ontheAirFont, popularFont, topRankedTvFont } from '../CategoryFont';
import SeasonModal from './SeasonModal';

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

const CategoryLabel = styled.div`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -50px;
  padding: 20px;
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Detail = styled.div`
  padding-top: 15px;
  text-align: start;
  margin-right: 10px;
  flex: 1;
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

const Type = styled.p`
  margin-top: 10px;
  background-color: #ff6060;
  font-size: 15px;
  padding: 5px;
  width: 130px;
`;

const TvComponent = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bigTvMatch = useMatch('/tv/:category/:tvId');
  const tvId = bigTvMatch?.params.tvId;
  const category = bigTvMatch?.params.category;

  const { data } = useQuery('distinctTvs', getDistinctTvs);
  const [videoData, setVideoData] = useState<IGetVideosResult>();
  const [selectedSeason, setSelectedSeason] = useState<ISeason | null>(null);
  const [showSeasonModal, setShowSeasonModal] = useState(false);
  const { data: tvDetail } = useQuery<IGetTvDetail>(['detail', tvId], () =>
    getTvDetail(tvId || '')
  );

  const onOverlayClicked = () => {
    navigate('/tv');
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      if (tvId) {
        const videoData = await getTvVideos(tvId);
        setVideoData(videoData);
      }
    };
    fetchVideoData();
  }, [tvId]);

  const clickTv =
    tvId &&
    data &&
    category &&
    data[category as keyof typeof data].find((tv) => tv.id + '' === tvId);

  const handleSeasonSelect = (seasonId: number) => {
    const selected =
      tvDetail?.seasons.find((season) => season.id === seasonId) || null;
    setSelectedSeason(selected);
    setShowSeasonModal(true); // Show the modal on season select
  };

  const closeSeasonModal = () => {
    setShowSeasonModal(false);
  };

  return (
    <Container>
      {data && (
        <>
          <SliderTv title="Popular" tvs={data.popular} category="popular" />
          <SliderTv
            title="On The Air"
            tvs={data.ontheAir}
            category="ontheAir"
          />
          <SliderTv
            title="Top Ranked"
            tvs={data.topRanked}
            category="topRanked"
          />
        </>
      )}

      <AnimatePresence>
        {bigTvMatch && clickTv ? (
          <>
            <Overlay
              onClick={onOverlayClicked}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie style={{ top: scrollY.get() + 100 }} layoutId={tvId}>
              {clickTv && videoData && videoData.results.length > 0 ? (
                <Video videos={videoData.results} />
              ) : (
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top , black, transparent), url(${makeImagePath(
                      clickTv.backdrop_path,
                      'w500'
                    )})`,
                  }}
                />
              )}
              <BigTitle>{clickTv.name}</BigTitle>
              <Explanation>
                <CategoryLabel>
                  {category === 'popular' && popularFont}
                  {category === 'ontheAir' && ontheAirFont}
                  {category === 'topRanked' && topRankedTvFont}
                </CategoryLabel>
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
                  ⭐️ {Number(clickTv.vote_average).toFixed(2)}
                </BigVoteAverage>

                {tvDetail && tvDetail.seasons.length > 0 && (
                  <>
                    <SeasonSelector
                      seasons={tvDetail.seasons}
                      onSeasonSelect={handleSeasonSelect}
                    />
                  </>
                )}
              </Explanation>
              <ExplanationSub>
                <BigOverview>{clickTv.overview}</BigOverview>

                {tvDetail && (
                  <Detail>
                    {tvDetail.genres.map((genre) => (
                      <GenreTitle key={genre.id}>{genre.name}</GenreTitle>
                    ))}

                    <Type>Type : {tvDetail?.type}</Type>
                  </Detail>
                )}
              </ExplanationSub>
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>

      {selectedSeason && showSeasonModal && (
        <SeasonModal
          season={selectedSeason}
          seasons={tvDetail!.seasons}
          onClose={closeSeasonModal}
          onSeasonSelect={handleSeasonSelect}
        />
      )}
    </Container>
  );
};

export default TvComponent;
