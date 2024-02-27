import {HttpAdapter} from '../../../config/adapters';
import {MovieDBMovie, MovieMappers} from '../../../infrastructure';
import {FullMovie} from '../../entities';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: string,
): Promise<FullMovie> => {
  try {
    const movie = await fetcher.get<MovieDBMovie>(`/${movieId}`);
    return MovieMappers.fromMovieDBToEntity(movie);
  } catch (error) {
    throw new Error('Error getting movie by id');
  }
};
