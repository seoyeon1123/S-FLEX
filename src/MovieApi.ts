import { promises } from 'dns';

const API_KEY = '5f90a5ae964c1e681e56c236101a5b46';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
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

export async function getDistinctMovies(): Promise<{
  nowPlaying: IGetMoviesResult;
  upcoming: IMovie[];
}> {
  const nowPlayingResult = await getMovies();
  const upcomingResult = await getUpcomingMovies();

  // 현재 상영 중인 영화 ID 목록
  const nowPlayingIds = new Set(
    nowPlayingResult.results.map((movie) => movie.id)
  );

  // 개봉 예정 영화 중 현재 상영 중이지 않은 영화 필터링
  const UpcomingMovies = upcomingResult.results.filter(
    (movie) => !nowPlayingIds.has(movie.id)
  );

  return {
    nowPlaying: nowPlayingResult,
    upcoming: UpcomingMovies,
  };
}
