import {HttpAdapter} from '../../../config/adapters';
import {MovieDBCastResponse} from '../../../infrastructure';
import {CastMappers} from '../../../infrastructure/mapppers/cast.mappers';

export const getMovieCastUseCase = async (
  fetcher: HttpAdapter,
  movieId: string,
) => {
  try {
    const {cast} = await fetcher.get<MovieDBCastResponse>(`/${movieId}`);
    return cast.map(CastMappers.fromMovieDBCastToEntity);
  } catch (error) {
    throw new Error('Error getting movie by id');
  }
};
