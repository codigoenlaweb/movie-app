import {useEffect, useState} from 'react';
import {getMovieByIdUseCase} from '../../core/use-cases/movie/get-by-id-use-case';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import {FullMovie} from '../../core/entities';
import {Cast} from '../../core/entities/movie/cast.entity';
import {getMovieCastUseCase} from '../../core/use-cases/movie/get-cast-use-case';

interface Props {
  movieId: string;
}

export const useMovie = ({movieId}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie | undefined>();
  const [cast, setCast] = useState<Cast[] | undefined>();

  useEffect(() => {
    const loadMovie = async () => {
      const [fullMovie, castMovie] = await Promise.all([
        getMovieByIdUseCase(movieDBFetcher, movieId),
        getMovieCastUseCase(movieDBFetcher, movieId),
      ]);
      setMovie(fullMovie);
      setCast(castMovie);
      setIsLoading(false);
    };

    loadMovie();
  }, [movieId]);

  return {movie, cast, isLoading};
};
