import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getGenreMovie, IGetGenreItem } from 'Api/GenreApi';
import { isLoggedIn, logout } from 'utils/authUtils';
import { useProfile } from './ProfileContext';
import { useNavigate } from 'react-router-dom';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faUserCircle,
  faStar,
  faHeart,
  faFilm,
  faTv,
  faGamepad,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111;
`;

const ProfilBox = styled.div`
  width: 500px;
  min-height: 700px;
  background-color: #222;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 30px;
`;

const ProfilImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilIconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 30px;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 80px;
  height: 80px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const EditImageButton = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover,
  &:focus {
    background-color: #ff3f3f;
  }
`;

const LogoutButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover,
  &:focus {
    background-color: #555;
  }
`;

const ProfileInfoContainer = styled.div`
  margin-bottom: 100px;
`;

const ProfileInfo = styled.div`
  font-size: 20px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.black.darker};
  background-color: ${(props) => props.theme.black.lighter};
  padding: 18px 30px;
  position: relative;
`;

const CustomIcon = styled(
  ({
    color,
    ...props
  }: FontAwesomeIconProps & { color: string | undefined }) => (
    <FontAwesomeIcon {...props} />
  )
)<{ color: string | undefined }>`
  color: ${(props) => props.color};
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
`;

// GenreList의 props 타입 정의
interface GenreListProps {
  visible: boolean;
}

const GenreList = styled.div<GenreListProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px; /* 각 버튼 사이의 간격 조정 */
  width: 100%;
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #222;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.visible ? 'grid' : 'none')};
  padding: 10px; /* 내부 여백 추가 */

  /* 가운데 정렬을 위한 추가 스타일 */
  justify-content: center;
  align-items: center;
`;

const GenreButton = styled.button`
  width: 200px;
  font-size: 15px;
  margin: 5px;
  padding: 5px 10px;
  background-color: #f53c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #924444;
  }
`;

const Profil = () => {
  const { profil } = useProfile();
  const navigate = useNavigate();
  const [selectedIcon, setSelectedIcon] = useState<IconProp | null>(
    JSON.parse(localStorage.getItem('selectedIcon') || 'null')
  );
  const [myIcon, setMyIcon] = useState(false);
  const [click, setClick] = useState(false);
  const [genre, setGenre] = useState<string>(
    localStorage.getItem('selectedGenre') || ''
  );
  const [isHovering, setIsHovering] = useState(false);

  const { data: genreData } = useQuery<IGetGenreItem>('genre', getGenreMovie);

  const handleEditImageClick = () => {
    setClick(true);
    setMyIcon(false);
    setSelectedIcon(null);
  };

  const handleIconClick = (icon: IconProp) => {
    setSelectedIcon(icon);
    setMyIcon(true);
    setClick(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleGenreHover = () => {
    setIsHovering(true);
  };

  const handleGenreLeave = () => {
    setIsHovering(false);
  };

  const handleGenreClick = (genreName: string) => {
    setGenre(genreName);
  };

  useEffect(() => {
    sessionStorage.setItem('selectedIcon', JSON.stringify(selectedIcon));
  }, [selectedIcon]);

  useEffect(() => {
    const storedIcon = JSON.parse(
      sessionStorage.getItem('selectedIcon') || 'null'
    );
    if (storedIcon) {
      setSelectedIcon(storedIcon);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('selectedGenre', genre);
  }, [genre]);

  useEffect(() => {
    const storedGenre = localStorage.getItem('selectedGenre') || '';
    if (storedGenre) {
      setGenre(storedGenre);
    }
  }, []);

  return (
    <Container>
      <ProfilBox>
        <ProfilImg>
          <Title>나의 프로필</Title>
          {myIcon === true ? (
            <div>
              {selectedIcon && (
                <CustomIcon
                  icon={selectedIcon}
                  color={
                    selectedIcon === faUser
                      ? 'red'
                      : selectedIcon === faUserCircle
                      ? 'orange'
                      : selectedIcon === faStar
                      ? 'yellow'
                      : selectedIcon === faHeart
                      ? 'green'
                      : selectedIcon === faFilm
                      ? 'blue'
                      : selectedIcon === faTv
                      ? 'purple'
                      : selectedIcon === faGamepad
                      ? 'pink'
                      : selectedIcon === faMusic
                      ? 'brown'
                      : undefined
                  }
                />
              )}
            </div>
          ) : null}
          {click === false || myIcon === true ? (
            <EditImageButton onClick={handleEditImageClick}>
              이미지 수정
            </EditImageButton>
          ) : null}
          {click && (
            <ProfilIconContainer>
              <Icon
                icon={faUser}
                color="red"
                onClick={() => handleIconClick(faUser)}
              />
              <Icon
                icon={faUserCircle}
                color="orange"
                onClick={() => handleIconClick(faUserCircle)}
              />
              <Icon
                icon={faStar}
                color="yellow"
                onClick={() => handleIconClick(faStar)}
              />
              <Icon
                icon={faHeart}
                color="green"
                onClick={() => handleIconClick(faHeart)}
              />
              <Icon
                icon={faFilm}
                color="blue"
                onClick={() => handleIconClick(faFilm)}
              />
              <Icon
                icon={faTv}
                color="purple"
                onClick={() => handleIconClick(faTv)}
              />
              <Icon
                icon={faGamepad}
                color="pink"
                onClick={() => handleIconClick(faGamepad)}
              />
              <Icon
                icon={faMusic}
                color="brown"
                onClick={() => handleIconClick(faMusic)}
              />
            </ProfilIconContainer>
          )}
        </ProfilImg>
        <ProfileInfoContainer>
          <ProfileInfo>이름 : {profil?.name}</ProfileInfo>
          <ProfileInfo>이메일 : {profil?.email}</ProfileInfo>
          <ProfileInfo
            onMouseEnter={handleGenreHover}
            onMouseLeave={handleGenreLeave}
          >
            내가 좋아하는 장르 : {genre}
            <GenreList visible={isHovering}>
              {genreData?.genres.map((genre) => (
                <GenreButton
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.name)}
                >
                  {genre.name}
                </GenreButton>
              ))}
            </GenreList>
          </ProfileInfo>
        </ProfileInfoContainer>
      </ProfilBox>
      {isLoggedIn() && (
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      )}
    </Container>
  );
};

export default Profil;
