import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';

interface Props {
  url: string;
  movieId: number;
  width?: number;
  height?: number;
}

export const MoviePoster = ({
  url,
  movieId,
  height = 400,
  width = 300,
}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Pressable
      style={({pressed}) => ({
        width,
        height,
        marginHorizontal: 4,
        paddingBottom: 20,
        paddingHorizontal: 7,
        opacity: pressed ? 0.9 : 1,
      })}
      onPress={() =>
        navigation.navigate('Details', {movieId: movieId.toString()})
      }>
      <View style={styles.imageContainer}>
        <Image source={{uri: url}} style={styles.image} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
  },
});
