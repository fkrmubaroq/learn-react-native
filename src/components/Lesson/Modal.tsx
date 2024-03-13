import CloseIcon from 'components/icons/CloseIcon';
import React, {useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <ModalForm
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Open Setting</Text>
      </Pressable>
    </View>
  );
};

const modalStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 14,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    paddingTop: 17,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.1,
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: 7,
  },
});

function ModalForm({
  setModalVisible,
  modalVisible,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  return (
    <Modal
      animationType="none"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={modalStyle.backdrop} />
      <View style={modalStyle.container}>
        <View style={modalStyle.modalView}>
          <View style={modalStyle.containerTitle}>
            <Text style={modalStyle.titleText}>Setting</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <CloseIcon width={15} height={15} />
            </TouchableOpacity>
          </View>
          <View style={modalStyle.content}>
            <ContributionToggle
              isEnabled={isEnabled}
              setIsEnabled={setIsEnabled}
              setActiveIndex={setActiveIndex}
            />
            <ContributionSetting
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              isEnabled={isEnabled}
              onHide={() => setModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const contributionToggleStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  switch: {
    transform: [{scale: 0.8}],
  },
  sideLeft: {
    rowGap: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  subText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#aaa',
  },
});
function ContributionToggle({
  isEnabled,
  setIsEnabled,
  setActiveIndex,
}: {
  isEnabled: boolean;
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <View style={contributionToggleStyle.container}>
      <View style={contributionToggleStyle.sideLeft}>
        <Text style={contributionToggleStyle.text}>Contibuttion</Text>
        <Text style={contributionToggleStyle.subText}>
          Control the contribution of members
        </Text>
      </View>
      <View>
        <Switch
          style={contributionToggleStyle.switch}
          trackColor={{true: 'blue'}}
          thumbColor="white"
          ios_backgroundColor="#eee"
          onValueChange={status => {
            setIsEnabled(status);
            if (!status) {
              setActiveIndex(-1);
            }
          }}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

const contributionSettingStyle = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  titleText: {
    fontSize: 11,
    color: '#444',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1.2,
    borderRadius: 10,
    minHeight: 50,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 10,
    rowGap: 5,
  },
  cardTitleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 10,
    color: '#999',
    letterSpacing: 0.3,
  },
  buttonCancel: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 9,
    borderRadius: 20,
  },
  buttonCancelText: {
    color: '#555',
    fontSize: 12,
  },
  buttonApply: {
    paddingHorizontal: 25,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  buttonApplyText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
});

const dataContributionSetting = [
  {
    title: 'Controlled',
    text: 'Allow members set as contributors to add content',
  },
  {
    title: 'Open',
    text: 'Allow all members to add content',
  },
];
function ContributionSetting({
  activeIndex,
  setActiveIndex,
  isEnabled,
  onHide,
}: {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  isEnabled: boolean;
  onHide: () => void;
}) {
  return (
    <View style={contributionSettingStyle.container}>
      <View style={{rowGap: 8}}>
        {dataContributionSetting.map((item, index) => (
          <Pressable
            key={index}
            style={[
              contributionSettingStyle.card,
              !isEnabled && {backgroundColor: '#eee'},
              activeIndex === index && {borderColor: 'blue'},
            ]}
            onPress={() => isEnabled && setActiveIndex(index)}>
            <Text
              style={[
                contributionSettingStyle.cardTitleText,
                !isEnabled && {color: '#ccc'},
              ]}>
              {item.title}
            </Text>
            <Text
              style={[
                contributionSettingStyle.cardText,
                !isEnabled && {color: '#ccc'},
              ]}>
              {item.text}
            </Text>
          </Pressable>
        ))}
      </View>

      <View
        style={{
          marginTop: 20,
          justifyContent: 'flex-end',
          flexDirection: 'row',
          columnGap: 10,
        }}>
        <TouchableHighlight
          style={contributionSettingStyle.buttonCancel}
          onPress={() => onHide()}>
          <Text style={contributionSettingStyle.buttonCancelText}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={contributionSettingStyle.buttonApply}
          onPress={() => onHide()}>
          <Text style={contributionSettingStyle.buttonApplyText}>Apply</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'blue',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
