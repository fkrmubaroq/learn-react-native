import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const justifyContentItems: TJustifyContentItems[] = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];

const flexDirections: TFlexDirection[] = [
  'row',
  'row-reverse',
  'column',
  'column-reverse',
];
type TJustifyContentItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type TFlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export default function Flexbox() {
  const [justifyContentValue, setJustifyContentValue] =
    useState<TJustifyContentItems>('flex-start');
  const [flexDirectionValue, setFlexDirectionValue] =
    useState<TFlexDirection>('column');

  return (
    <View style={{flex: 1}}>
      <FlexboxBasic
        justifyContentValue={justifyContentValue}
        flexDirectionValue={flexDirectionValue}
        setJustifyContentValue={setJustifyContentValue}
        setFlexDirectionValue={setFlexDirectionValue}>
        <View style={[styles.box, styles.box1]} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
      </FlexboxBasic>
    </View>
  );
}

function FlexboxBasic({
  setJustifyContentValue,
  justifyContentValue,
  setFlexDirectionValue,
  flexDirectionValue,
  children,
}: {
  setJustifyContentValue: (value: TJustifyContentItems) => void;
  justifyContentValue: TJustifyContentItems;
  setFlexDirectionValue: (value: TFlexDirection) => void;
  flexDirectionValue: TFlexDirection;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.containerFlex}>
      <Text style={styles.title}>Justify Content : </Text>
      <View style={[styles.containerLabel]}>
        {justifyContentItems.map((item, key) => (
          <TouchableOpacity
            style={[
              styles.button,
              item === justifyContentValue && styles.selectedButton,
            ]}
            key={key}
            onPress={() => setJustifyContentValue(item)}>
            <Text
              style={[
                styles.buttonLabel,
                justifyContentValue === item && styles.selectedLabel,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.title}>Flex Direction : </Text>
      <View style={[styles.containerLabel]}>
        {flexDirections.map((item, key) => (
          <TouchableOpacity
            style={[
              styles.button,
              item === flexDirectionValue && styles.selectedButton,
            ]}
            key={key}
            onPress={() => setFlexDirectionValue(item)}>
            <Text
              style={[
                styles.buttonLabel,
                flexDirectionValue === item && styles.selectedLabel,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={[
          styles.containerBox,
          {
            justifyContent: justifyContentValue,
            flexDirection: flexDirectionValue,
          },
        ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
  },
  containerBox: {
    marginTop: 10,
    backgroundColor: 'lightgray',
    width: '80%',
    height: 200,
    alignSelf: 'center',
  },
  containerLabel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    paddingLeft: 7,
    paddingTop: 10,
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
});
