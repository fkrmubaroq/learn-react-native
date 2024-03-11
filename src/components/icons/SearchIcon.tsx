import React from 'react';
import {Image, StyleProp, View, ViewStyle} from 'react-native';
import searchIcon from 'src/assets/icons/search-icon.png';

export default function SearchIcon({
  width = 20,
  height = 20,
  style,
}: {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={style}>
      <Image
        source={searchIcon}
        style={{
          width,
          height,
        }}
      />
    </View>
  );
}
