const API_KEY = '5f90a5ae964c1e681e56c236101a5b46';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IGenre {
  id: number;
  name: string;
}

export interface IGetGenreItem {
  genres: IGenre[];
}

export interface IGenreMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
}

export interface IGetMovieByGenre {
  results: IGenreMovie[];
}
export interface IGenreTvShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  genre_ids: number[];
  origin_country: string[];
  backdrop_path: string | null;
  poster_path: string | null;
}

export interface IGetTvByGenre {
  page: number;
  results: IGenreTvShow[];
  total_pages: number;
  total_results: number;
}

export function getGenreMovie(): Promise<IGetGenreItem> {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getMoviesByGenre(genreId: number): Promise<IGetMovieByGenre> {
  return fetch(
    `${BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=ko-KR`
  ).then((response) => response.json());
}

export function getGenreTv(): Promise<IGetGenreItem> {
  return fetch(
    `${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getTvByGenre(genreId: number): Promise<IGetTvByGenre> {
  return fetch(
    `${BASE_PATH}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&language=ko-KR`
  ).then((response) => response.json());
}
