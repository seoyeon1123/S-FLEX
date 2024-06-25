const API_KEY = '5f90a5ae964c1e681e56c236101a5b46';
const BASE_PATH = 'https://api.themoviedb.org/3/';

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimun: string;
  };

  pages: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
