import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const positionList: TPosition[] = ['relative', 'absolute'];
type TPosition = 'relative' | 'absolute';
export default function RelativeAbsolute() {
  const [position, setPosition] = useState<TPosition>('relative');
  return (
    <View style={{flex: 1, marginTop: 20, marginBottom: 20}}>
      <PositionBasic position={position} setPosition={setPosition}>
        <View
          style={[styles.box, styles.box1, {top: 10, left: 10, position}]}
        />
        <View
          style={[styles.box, styles.box2, {top: 20, left: 20, position}]}
        />
        <View
          style={[styles.box, styles.box3, {top: 30, left: 30, position}]}
        />
      </PositionBasic>
    </View>
  );
}

function PositionBasic({
  position,
  setPosition,
  children,
}: {
  position: TPosition;
  setPosition: (value: TPosition) => void;
  children: React.ReactNode;
}) {
  return (
    <View>
      <Text style={{textAlign: 'center', fontWeight: '600'}}>Position</Text>
      <View style={[styles.containerLabel]}>
        {positionList.map((item, key) => (
          <TouchableOpacity
            style={[styles.button, item === position && styles.selectedButton]}
            key={key}
            onPress={() => setPosition(item)}>
            <Text
              style={[
                styles.buttonLabel,
                position === item && styles.selectedLabel,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.containerBox}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerLabel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '40%',
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  selectedLabel: {
    color: 'white',
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  containerBox: {
    marginTop: 10,
    backgroundColor: 'lightgray',
    width: '80%',
    height: 200,
    alignSelf: 'center',
  },
  box: {
    width: 50,
    height: 50,
  },
  box1: {
    backgroundColor: 'powderblue',
  },
  box2: {
    backgroundColor: 'skyblue',
  },
  box3: {
    backgroundColor: 'steelblue',
  },
});
