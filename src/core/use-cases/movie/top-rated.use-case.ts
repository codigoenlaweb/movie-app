import {HttpAdapter} from '../../../config/adapters';
import {MovieMappers, TopRatedResponse} from '../../../infrastructure';
import {Movie} from '../../entities';

interface Options {
  page?: number;
  limit?: number;
}

export const movieTopRatedUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  const topRated = await fetcher.get<TopRatedResponse>('/top_rated', {
    params: {
      page: options?.page || 1,
    },
  });
  return topRated.results.map(MovieMappers.fromMovieDBResultToEntity);
};
