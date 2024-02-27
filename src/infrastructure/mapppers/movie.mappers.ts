import type {MovieDBMovie, MovieResult} from '../interfaces/movie-db.responses';
import {FullMovie, Movie} from '../../core/entities';

export class MovieMappers {
  static fromMovieDBResultToEntity(result: MovieResult): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: new Date(result.release_date),
      rating: result.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
    };
  }
  static fromMovieDBToEntity(result: MovieDBMovie): FullMovie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: new Date(result.release_date),
      rating: result.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
      genres: result.genres.map(genre => genre.name),
      duration: result.runtime,
      budget: result.budget,
      originalTitle: result.original_title,
      productionCompanies: result.production_companies.map(
        company => company.name,
      ),
    };
  }
}
