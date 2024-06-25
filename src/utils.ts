export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
}
//이미지의 경로를 만들어주는 함수임
