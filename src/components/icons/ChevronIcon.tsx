import React from 'react';
import {AnimatableStringValue, Image, View} from 'react-native';
import chevronIcon from 'src/assets/icons/chevron-icon.png';
type RotateType = 'left' | 'right' | 'top' | 'bottom';
const rotateChevron: Record<RotateType, AnimatableStringValue> = {
  left: '90deg',
  right: '-90deg',
  top: '180deg',
  bottom: '0deg',
};

export default function ChevronIcon({
  width = 20,
  height = 20,
  rotate = 'bottom',
}: {
  width?: number;
  height?: number;
  rotate?: RotateType;
}) {
  return (
    <View>
      <Image
        source={chevronIcon}
        style={{
          width,
          height,
          transform: [{rotate: rotateChevron[rotate]}],
        }}
      />
    </View>
  );
}
