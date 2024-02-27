import {View} from 'react-native';
import {Movie} from '../../../core/entities';
import {ScrollView} from 'react-native-gesture-handler';
import {MoviePoster} from './MoviePoster';

interface Props {
  movies: Movie[];
  height?: number;
}

export const PosterCarousel = ({height = 440, movies}: Props) => {
  return (
    <View style={{height}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map(movie => (
          <View key={movie.id}>
            <MoviePoster url={movie.poster} movieId={movie.id} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
