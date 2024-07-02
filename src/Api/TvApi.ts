const API_KEY = '5f90a5ae964c1e681e56c236101a5b46';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  vote_average: string;
  release_date: string;
  genre_ids: [];
}

export interface IGetTvResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: ITv[];
}

export interface IGetTvDetail {
  episode_run_time: number;
  first_air_date: string;
  last_air_date: string;
  genres: IDetailTv[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: ISeason[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
}

export interface IDetailTv {
  id: number;
  name: string;
}

export interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export function getTvDetail(tvId: string) {
  return fetch(
    `${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export async function getPopularTvs(): Promise<IGetTvResult> {
  const response = await fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`
  );
  const data = await response.json();
  return data;
}

export async function getOnTheAirTvs(): Promise<IGetTvResult> {
  const response = await fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR`
  );
  const data = await response.json();
  return data;
}

export async function getTopRatedTvs(): Promise<IGetTvResult> {
  const response = await fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`
  );
  const data = await response.json();
  return data;
}

export async function getDistinctTvs(): Promise<{
  popular: ITv[];
  ontheAir: ITv[];
  topRanked: ITv[];
}> {
  const popularResult = await getPopularTvs();
  const onTheAirResult = await getOnTheAirTvs();
  const topRankedResult = await getTopRatedTvs();

  const popularIds = new Set(popularResult.results.map((tv) => tv.id));

  const ontheAirTvs = onTheAirResult.results.filter(
    (tv) => !popularIds.has(tv.id)
  );

  const topRankedTvs = topRankedResult.results.filter(
    (tv) =>
      !popularIds.has(tv.id) &&
      !ontheAirTvs.some((ontheAirTv) => ontheAirTv.id === tv.id)
  );

  return {
    popular: popularResult.results,
    ontheAir: ontheAirTvs,
    topRanked: topRankedTvs,
  };
}
