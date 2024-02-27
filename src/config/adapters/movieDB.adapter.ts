import {AxiosAdapter} from '.';

export const movieDBFetcher = new AxiosAdapter({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '2008b8c52c8e0b6d527fa353d6f5ca76',
    language: 'es',
  },
});
