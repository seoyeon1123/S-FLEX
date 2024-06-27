// Video.tsx
import React from 'react';
import styled from 'styled-components';
import { IVideos } from '../api'; // IVideos는 실제 비디오 데이터 타입에 맞게 수정해야 합니다.

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  position: relative;
  width: 100%;
`;

const VideoBox = styled.div`
  width: 100%;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
`;

const VideoTitle = styled.h3`
  font-size: 16px;
  padding: 10px;
  color: ${(props) => props.theme.white.darker};
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

interface IVideoProps {
  videos: IVideos[]; // IVideos는 실제 비디오 데이터 타입에 맞게 수정해야 합니다.
}

const Video = ({ videos }: IVideoProps) => {
  const playVideo = (key: string) => {
    window.open(`https://www.youtube.com/watch?v=${key}`, '_blank');
  };

  return (
    <VideoContainer>
      {videos.map((video) => (
        <VideoBox key={video.id}>
          <VideoTitle>{video.name}</VideoTitle>
          <PlayButton onClick={() => playVideo(video.key)}>▶</PlayButton>
        </VideoBox>
      ))}
    </VideoContainer>
  );
};

export default Video;
