import {HttpAdapter} from '../../../config/adapters';
import {MovieMappers, UpcomingResponse} from '../../../infrastructure';
import {Movie} from '../../entities';

interface Options {
  page?: number;
  limit?: number;
}

export const movieUpcomingUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  const upcoming = await fetcher.get<UpcomingResponse>('/upcoming', {
    params: {
      page: options?.page || 1,
    },
  });
  return upcoming.results.map(MovieMappers.fromMovieDBResultToEntity);
};
