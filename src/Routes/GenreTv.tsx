import { useQuery } from 'react-query';
import { useState } from 'react';
import styled from 'styled-components';
import {
  IGetGenreItem,
  IGetTvByGenre,
  getGenreTv,
  getTvByGenre,
} from '../Api/GenreApi';
import SliderGenreTv from '../Components/Genre/SliderGenreTv';
import { AnimatePresence, motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const GenreContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  height: 40vh;
  margin: 30px auto 0; /* Adds top margin and centers horizontally */
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
`;

const GenreTitle = styled(motion.h1)`
  font-size: 30px;
  margin: 100px 0px 50px 0px;
`;

const GenreList = styled.div`
  width: 90%;
`;

const GenreButton = styled.button`
  font-size: 20px;
  margin: 20px 25px;
  padding: 10px 20px;
  background-color: #3c3cf5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #6e6ef3;
  }
`;

const GenreTv = () => {
  const [selectGenreId, setSelectGenreId] = useState<number | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedTvId, setSelectedTvId] = useState<number | null>(null);

  const { data: genreData, isLoading: genresLoading } = useQuery<IGetGenreItem>(
    'genre',
    getGenreTv
  );

  const { data: tvData, isLoading: tvDataLoading } = useQuery<IGetTvByGenre>(
    ['moviesByGenre', selectGenreId],
    () => getTvByGenre(selectGenreId!)
  );

  const handleGenreSelection = (genreId: number, genreName: string) => {
    setSelectGenreId(genreId);
    setSelectedGenre(genreName); // 선택한 장르의 이름 설정
  };

  const handleMovieClick = (tvId: number) => {
    setSelectedTvId(tvId);
  };

  return (
    <>
      <AnimatePresence>
        <Container>
          <GenreContainer>
            <GenreTitle>어떤 세계에 몰입하고 싶으세요?</GenreTitle>
            <GenreList>
              {genreData?.genres.map((genre) => (
                <GenreButton
                  key={genre.id}
                  onClick={() => handleGenreSelection(genre.id, genre.name)}
                >
                  # {genre.name}
                </GenreButton>
              ))}
            </GenreList>
          </GenreContainer>

          {selectGenreId ? (
            <SliderGenreTv
              onMovieClick={handleMovieClick}
              genre={selectedGenre + ''}
              tvs={tvData?.results || []}
            />
          ) : null}
        </Container>
      </AnimatePresence>
    </>
  );
};

export default GenreTv;
