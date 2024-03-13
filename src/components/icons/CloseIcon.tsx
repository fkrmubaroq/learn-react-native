import React from 'react';
import {Image, StyleProp, View, ViewStyle} from 'react-native';
import closeIcon from 'src/assets/icons/close-icon-black.png';

export default function CloseIcon({
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
        source={closeIcon}
        style={{
          width,
          height,
        }}
      />
    </View>
  );
}
