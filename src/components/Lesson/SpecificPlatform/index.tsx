import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import logoAndroid from 'src/assets/img/logo/logo-android.png';
import logoIos from 'src/assets/img/logo/logo-ios.png';
import Header from './Header.ios';

export default function Index() {
  return (
    <View>
      <Header />
      <Content />
    </View>
  );
}

function Content() {
  return (
    <View style={styles.content}>
      <Card />
    </View>
  );
}

function Card() {
  return (
    <View style={styles.card}>
      {Platform.OS === 'android' ? (
        <View style={styles.content}>
          <Image source={logoAndroid} style={styles.imageSize} />
          <Text>Text for Android</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Image source={logoIos} style={styles.imageSize} />
          <Text>Text for Ios</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 7,
    marginTop: 10,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    padding: 15,
    alignItems: 'center',
    rowGap: 10,
  },
  imageSize: {
    ...Platform.select({
      ios: {
        width: 50,
        height: 50,
      },
      android: {
        width: 75,
        height: 75,
      },
    }),
  },
});
