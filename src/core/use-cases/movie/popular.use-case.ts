import {HttpAdapter} from '../../../config/adapters';
import {MovieMappers, PopularResponse} from '../../../infrastructure';
import {Movie} from '../../entities';

interface Options {
  page?: number;
  limit?: number;
}

export const moviePopularUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  const popular = await fetcher.get<PopularResponse>('/popular', {
    params: {
      page: options?.page || 1,
    },
  });

  return popular.results.map(MovieMappers.fromMovieDBResultToEntity);
};
