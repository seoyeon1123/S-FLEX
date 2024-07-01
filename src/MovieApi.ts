const API_KEY = '5f90a5ae964c1e681e56c236101a5b46';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: string;
  release_date: string;
  genre_ids: [];
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export interface IGetMovieDetail {
  runtime: string;
  tagline: string;
  genres: IDetail[];
}

export interface IDetail {
  id: number;
  name: string;
}

export function getMovieDetail(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

// getMovies 함수 정의
export async function getMovies(): Promise<IGetMoviesResult> {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  );
  if (!response.ok) {
    throw new Error('현재 상영 중인 영화를 가져오지 못했습니다.');
  }
  return response.json();
}

// getUpcomingMovies 함수 정의
export async function getUpcomingMovies(): Promise<IGetMoviesResult> {
  const response = await fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR`
  );
  if (!response.ok) {
    throw new Error('개봉 예정 영화를 가져오지 못했습니다.');
  }
  return response.json();
}

export async function getTopRatedMovies(): Promise<IGetMoviesResult> {
  const response = await fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`
  );
  if (!response.ok) {
    throw new Error('Top Rated 영화를 가져오지 못했습니다.');
  }
  return response.json();
}

export async function getDistinctMovies(): Promise<{
  nowPlaying: IMovie[];
  upcoming: IMovie[];
  topRanked: IMovie[];
}> {
  const nowPlayingResult = await getMovies();
  const upcomingResult = await getUpcomingMovies();
  const topRankedResult = await getTopRatedMovies();

  // 현재 상영 중인 영화 ID 목록
  const nowPlayingIds = new Set(
    nowPlayingResult.results.map((movie) => movie.id)
  );

  // 개봉 예정 영화 중 현재 상영 중이지 않은 영화 필터링
  const upcomingMovies = upcomingResult.results.filter(
    (movie) => !nowPlayingIds.has(movie.id)
  );

  // Top Rated 영화 중 현재 상영 중이거나 개봉 예정이 아닌 영화 필터링
  const topRankedMovies = topRankedResult.results.filter(
    (movie) =>
      !nowPlayingIds.has(movie.id) &&
      !upcomingMovies.some((upcomingMovie) => upcomingMovie.id === movie.id)
  );

  return {
    nowPlaying: nowPlayingResult.results,
    upcoming: upcomingMovies,
    topRanked: topRankedMovies,
  };
}
