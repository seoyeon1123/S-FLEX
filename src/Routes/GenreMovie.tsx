// Genre.tsx

import { useQuery } from 'react-query';
import { useState } from 'react';
import styled from 'styled-components';
import {
  IGetGenreItem,
  IGetMovieByGenre,
  getGenreMovie,
  getMoviesByGenre,
} from '../Api/GenreApi';
import SliderGenre from '../Components/Genre/SliderGenre';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const GenreContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: 30px auto 0; /* Adds top margin and centers horizontally */
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
`;

const GenreTitle = styled.h1`
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
  background-color: #ff4545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #b30000;
  }
`;

const Genre = () => {
  const [selectGenreId, setSelectGenreId] = useState<number | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const { data: genreData, isLoading: genresLoading } = useQuery<IGetGenreItem>(
    'genre',
    getGenreMovie
  );

  const { data: moviesData, isLoading: moviesLoading } =
    useQuery<IGetMovieByGenre>(['moviesByGenre', selectGenreId], () =>
      getMoviesByGenre(selectGenreId!)
    );

  const handleGenreSelection = (genreId: number, genreName: string) => {
    setSelectGenreId(genreId);
    setSelectedGenre(genreName); // 선택한 장르의 이름 설정
  };

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  return (
    <Container>
      {genresLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <GenreContainer>
          <GenreTitle>어떤 세계에 몰입하고 싶으세요?</GenreTitle>
          <GenreList>
            {genreData?.genres.map((genre) => (
              <GenreButton
                key={genre.id}
                onClick={() => handleGenreSelection(genre.id, genre.name)}
              >
                #{genre.name}
              </GenreButton>
            ))}
          </GenreList>
        </GenreContainer>
      )}

      {selectGenreId ? (
        <SliderGenre
          onMovieClick={handleMovieClick}
          genre={selectedGenre || ''}
          movies={moviesData?.results || []}
        />
      ) : null}
    </Container>
  );
};

export default Genre;
