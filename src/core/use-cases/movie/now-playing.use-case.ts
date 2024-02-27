import {HttpAdapter} from '../../../config/adapters';
import {MovieMappers, NowPlayingResponse} from '../../../infrastructure';
import {Movie} from '../../entities';

interface Options {
  page?: number;
  limit?: number;
}

export const movieNowPlayingUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing', {
    params: {
      page: options?.page || 1,
    },
  });
  return nowPlaying.results.map(MovieMappers.fromMovieDBResultToEntity);
};
