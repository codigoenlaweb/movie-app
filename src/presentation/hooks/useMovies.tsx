import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

let popularPage = 1;
let topRatedPage = 1;
let upcomingPage = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    const initiaLoad = async () => {
      const [nowPlayingMovies, upcomingMovies, topRatedMovies, popularMovies] =
        await Promise.all([
          UseCases.movieNowPlayingUseCase(movieDBFetcher),
          UseCases.moviePopularUseCase(movieDBFetcher),
          UseCases.movieTopRatedUseCase(movieDBFetcher),
          UseCases.movieUpcomingUseCase(movieDBFetcher),
        ]);

      setNowPlaying(nowPlayingMovies);
      setTopRated(topRatedMovies);
      setPopular(popularMovies);
      setUpcoming(upcomingMovies);
      setIsLoading(false);
    };

    initiaLoad();
  }, []);

  const popularNextPage = async () => {
    popularPage++;
    const newPopularMovies = await UseCases.moviePopularUseCase(
      movieDBFetcher,
      {page: popularPage},
    );

    setPopular([...popular, ...newPopularMovies]);
  };

  const topRatedNextPage = async () => {
    topRatedPage++;
    const newTopRatedMovies = await UseCases.movieTopRatedUseCase(
      movieDBFetcher,
      {page: topRatedPage},
    );

    setTopRated([...topRated, ...newTopRatedMovies]);
  };

  const upcomingNextPage = async () => {
    upcomingPage++;
    const newUpcomingMovies = await UseCases.movieUpcomingUseCase(
      movieDBFetcher,
      {page: upcomingPage},
    );

    setUpcoming([...upcoming, ...newUpcomingMovies]);
  };

  const nowPlayingNextPage = async () => {
    const newNowPlayingMovies = await UseCases.movieNowPlayingUseCase(
      movieDBFetcher,
      {page: nowPlaying.length / 20 + 1},
    );

    setNowPlaying([...nowPlaying, ...newNowPlayingMovies]);
  };

  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    popularNextPage,
    topRatedNextPage,
    upcomingNextPage,
    nowPlayingNextPage,
  };
};
