import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMovies} from '../hooks/useMovies';
import {HorizontalCarrousel, PosterCarousel} from '../components';

export const Test = () => {
  const {top} = useSafeAreaInsets();
  const {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    popularNextPage,
    topRatedNextPage,
    upcomingNextPage,
  } = useMovies();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        {/* principal Movies */}
        <PosterCarousel movies={nowPlaying} />

        {/* popular Movies */}
        <HorizontalCarrousel
          movies={popular}
          title="Populares"
          loadNextPage={popularNextPage}
        />
      </View>
    </ScrollView>
  );
};
