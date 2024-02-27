import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import {Movie} from '../../../core/entities';
import {FlatList} from 'react-native-gesture-handler';
import {MoviePoster} from '..';
import {useEffect, useRef} from 'react';

interface Props {
  movies: Movie[];
  title?: string;
  loadNextPage?: () => void;
}

export const HorizontalCarrousel = ({movies, title, loadNextPage}: Props) => {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
      console.log('isLoaded');
    }, 200);
  }, [movies]);

  const onScroll = (eventScroll: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;
    const {contentOffset, layoutMeasurement, contentSize} =
      eventScroll.nativeEvent;

    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;

    if (!isEndReached) return;

    // load more movies
    !!loadNextPage && loadNextPage();
    isLoading.current = true;
    console.log('load more movies');
  };

  return (
    <View style={{height: !!title ? 260 : 220}}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: '300',
          marginLeft: 10,
          marginBottom: 10,
        }}>
        {title}
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onScroll={onScroll}
        renderItem={({item}) => (
          <MoviePoster
            url={item.poster}
            movieId={item.id}
            width={140}
            height={200}
          />
        )}
      />
    </View>
  );
};
