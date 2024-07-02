const API_KEY = '5f90a5ae964c1e681e56c236101a5b46';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IVideos {
  name: string;
  key: string;
  site: string;
  type: string;
  id: number;
}

export interface IGetVideosResult {
  id: number;
  results: IVideos[];
}

export interface ISearch {
  backdrop_path: string;
  id: number;
  title: string;
  name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  vote_average: string;
}

export interface IGetSearchResult {
  results: ISearch[];
  page: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IGenreListResult {
  genres: IGenre[];
}

export function getSearchs(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/multi?query=${keyword}&include_adult=false&language=ko-KR&api_key=${API_KEY}&page=1`
  ).then((response) => response.json());
}

export function getTvShows() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getVideos(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getGenre(): Promise<IGenreListResult> {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=kr`
  ).then((response) => response.json());
}

export function getTvVideos(tvId: string) {
  return fetch(
    `${BASE_PATH}/tv/${tvId}/videos?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
