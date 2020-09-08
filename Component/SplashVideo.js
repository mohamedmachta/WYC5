import React, { memo, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';
import navigation from '../navigation/navigation'

type Props = {
  navigation: Navigation;
};
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height/1.5;
const SplashVideo = ({ navigation }: Props) =>{
  const get_dash = async( ) => {
    await new Promise( resolve => setTimeout( resolve,7000 ))
    await navigation.navigate('Route');
  }  
  useEffect(() => {
    get_dash();
  }, []);
  return(
      <View style={styles.container}>
    <Video
        source={require('../assets/bmw.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        style={styles.bmw}
      />
      </View>
);
} 

const styles = StyleSheet.create({
  bmw: {
    width: width,
    height: height,
  },
  container : {
      flex : 1,
      alignItems : "center",
      justifyContent : "center",
      backgroundColor : 'black'
  }
});

export default SplashVideo;
