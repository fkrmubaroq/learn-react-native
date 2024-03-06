import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import image2 from 'src/assets/img/image-2.jpg';
import image3 from 'src/assets/img/image-3.jpg';
import image4 from 'src/assets/img/image-4.jpg';
import image5 from 'src/assets/img/image-5.jpg';
import image6 from 'src/assets/img/image-6.jpg';
import image1 from 'src/assets/img/image.jpg';

type PersonListType = {
  image: ImageSourcePropType;
  name: string;
  position: string;
  quote: string;
};
const personLists: PersonListType[] = [
  {
    image: image1,
    name: 'Andrew',
    position: 'Master of Cerebral Operations',
    quote: 'Success in business requires drive and determination',
  },
  {
    image: image2,
    name: 'Prof. Adelbert Murphy',
    position: 'Executive Resource Officer',
    quote:
      'The key to success is to focus our conscious mind on things we desire not things we fear',
  },
  {
    image: image3,
    name: 'Dr. Brandon Klocko Sr.',
    position: 'Chief Management Strategist',
    quote: 'The key to business is to create value',
  },
  {
    image: image4,
    name: 'Prof. Terrance Heller IV',
    position: 'Head of Procurement',
    quote: "Excellence is not a skill, it's an attitude.",
  },
  {
    image: image5,
    name: 'Dr. Camron Veum V',
    position: 'Director of Capital Operations',
    quote: 'The key to business is to create value for others',
  },
  {
    image: image6,
    name: 'Dr. Casper Keeling',
    position: 'Principal Acquisitions',
    quote: 'Business is the salt of life.',
  },
];

type TModeView = 'List' | 'Grid';
export default function ImageList() {
  const [view, setView] = useState<TModeView>('Grid');
  return (
    <ScrollView style={{flex: 1}}>
      <ModeView setView={setView} view={view} />
      <View style={[styles.container, view === 'Grid' && styles.containerGrid]}>
        {personLists.map((item, key) => (
          <ProfileItem key={key} data={item} view={view} />
        ))}
      </View>
    </ScrollView>
  );
}

const listView: TModeView[] = ['List', 'Grid'];
function ModeView({
  setView,
  view,
}: {
  view: TModeView;
  setView: React.Dispatch<React.SetStateAction<TModeView>>;
}) {
  return (
    <View style={styles.containerModeView}>
      {listView.map((item, key) => (
        <TouchableOpacity
          onPress={() => setView(item)}
          key={key}
          style={[styles.modeView, view === item && styles.modeViewSelected]}>
          <Text
            style={[
              styles.modeViewText,
              view === item && styles.modeViewTextSelected,
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
function ProfileItem({data, view}: {data: PersonListType; view: TModeView}) {
  return (
    <View
      style={[
        styles.containerProfile,
        view === 'Grid' && styles.containerProfileGrid,
      ]}>
      <Image source={data.image} style={styles.image} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileInfo_name}>{data.name}</Text>
        <Text style={styles.profileInfo_position}>{data.position}</Text>
        <Text style={styles.profileInfo_quote}>"{data.quote}"</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
  },
  containerGrid: {
    flexDirection: 'column',
  },
  modeViewTextSelected: {
    color: 'white',
  },
  modeViewSelected: {
    backgroundColor: '#222',
  },
  modeViewText: {
    fontSize: 12,
  },
  containerModeView: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  modeView: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 5,
  },
  containerProfile: {
    padding: 10,
    width: '48%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    rowGap: 5,
    minHeight: 170,
  },
  containerProfileGrid: {
    width: '100%',
    minHeight: 150,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileInfo_name: {
    fontWeight: '700',
    fontSize: 12,
    color: 'black',
  },
  profileInfo_position: {
    fontWeight: '500',
    fontSize: 10,
    color: '#aaa',
  },
  profileInfo_quote: {
    marginTop: 7,
    fontStyle: 'italic',
    fontSize: 11,
    color: '#aaa',
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
