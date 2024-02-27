import type {MovieDBCast} from '../interfaces/movie-db.responses';
import {Cast} from '../../core/entities/movie/cast.entity';

export class CastMappers {
  static fromMovieDBCastToEntity(result: MovieDBCast): Cast {
    return {
      avatar: result.profile_path
        ? `https://image.tmdb.org/t/p/w500${result.profile_path}`
        : 'https://i.stack.imgur.com/l60Hf.png',
      character: result.character || 'No character',
      id: result.id,
      name: result.name,
    };
  }
}
