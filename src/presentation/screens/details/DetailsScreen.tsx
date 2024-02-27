import {Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';
import {useMovie} from '../../hooks/useMovie';
import {MovieHeader} from '../../components/movies/movie/MovieHeader';
import {MovieDetails} from '../../components/movies/movie/MovieDetails';
import {ScrollView} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({
  route: {
    params: {movieId},
  },
}: Props) => {
  const {isLoading, movie, cast} = useMovie({movieId});

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      {/* header */}
      {movie && cast && (
        <>
          <MovieHeader movie={movie} />
          <MovieDetails movie={movie} cast={cast} />
        </>
      )}
    </ScrollView>
  );
};
