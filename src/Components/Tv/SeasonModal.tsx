import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { makeImagePath } from '../../utils';
import { ISeason } from '../../Api/TvApi';
import { IGetVideosResult, getTvVideos } from '../../Api/Api';
import SeasonSelector from './SeasonSelector';
import Video from '../Video';

interface SeasonModalProps {
  season: ISeason;
  seasons: ISeason[];
  onClose: () => void;
  onSeasonSelect: (seasonId: number) => void;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SeasonBox = styled(motion.div)`
  width: 40vw;
  height: 50vh;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const CoverImage = styled.div<{ backgroundImage: string }>`
  width: 70%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 15px;
  margin-bottom: 20px;
  background-image: ${(props) => props.backgroundImage};
`;

const Explanation = styled.div`
  margin: 70px 20px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
`;

const SeasonTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 30px;
  margin-bottom: 10px;
`;

const ExplanationText = styled.p`
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.5;
  margin-bottom: 10px;
`;

const SeasonOverview = styled.p`
  font-size: 15px;
  border: 1px solid black;
  width: 100%;
  padding: 5px;
  position: relative;
  margin-top: 10px;
  background-color: rgba(149, 149, 149, 0.2);
`;

const SeasonModal = ({
  season,
  seasons,
  onClose,
  onSeasonSelect,
}: SeasonModalProps) => {
  const [selectedSeason, setSelectedSeason] = useState<ISeason>(season);
  const [videoData, setVideoData] = useState<IGetVideosResult>();

  const tvId = season.id;

  useEffect(() => {
    setSelectedSeason(season);
  }, [season]);

  const handleSeasonChange = (seasonId: number) => {
    const selected = seasons.find((s) => s.id === seasonId);
    if (selected) {
      setSelectedSeason(selected);
      onSeasonSelect(seasonId);
    }
  };

  const overview =
    selectedSeason.overview.length > 200
      ? selectedSeason.overview.slice(0, 200) + '...'
      : selectedSeason.overview;

  useEffect(() => {
    const fetchVideoData = async () => {
      if (tvId) {
        const videoData = await getTvVideos(tvId + '');
        setVideoData(videoData);
      }
    };
    fetchVideoData();
  }, [tvId]);

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <SeasonBox onClick={(e) => e.stopPropagation()}>
        {videoData && videoData.results && videoData.results.length > 0 ? (
          <Video videos={videoData.results} />
        ) : (
          <CoverImage
            backgroundImage={`linear-gradient(to top, black, transparent), url(${makeImagePath(
              selectedSeason.poster_path,
              'w500'
            )})`}
          />
        )}
        <Explanation>
          <SeasonSelector
            seasons={seasons}
            onSeasonSelect={handleSeasonChange}
          />
          <SeasonTitle>{selectedSeason.name}</SeasonTitle>
          <ExplanationText>
            에피소드 수: {selectedSeason.episode_count}
          </ExplanationText>
          <ExplanationText>
            방영일: 🗓️ {selectedSeason.air_date}
          </ExplanationText>
          <ExplanationText>
            평균 평점: ⭐️ {selectedSeason.vote_average}
          </ExplanationText>
          {selectedSeason.overview && (
            <SeasonOverview>{overview}</SeasonOverview>
          )}
        </Explanation>
      </SeasonBox>
    </ModalOverlay>
  );
};

export default SeasonModal;
