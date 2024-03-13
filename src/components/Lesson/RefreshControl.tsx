import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type SampleDataType = {
  fact: string;
  length: number;
};
const App = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [data, setData] = useState<SampleDataType[]>([]);

  const fetchData = useCallback(async () => {
    const response = await fetch('https://catfact.ninja/fact');
    const result = await response.json();
    setData(state => [result, ...state]);
    initialLoad && setInitialLoad(false);
    // Fetch the data and update your state accordingly
  }, [initialLoad]);

  useEffect(() => {
    if (!initialLoad) {
      return;
    }
    fetchData();
  }, [fetchData, initialLoad]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => {
      setRefreshing(false);
    });
  };

  return (
    <View style={{flex: 1}}>
      {initialLoad ? (
        <LoadingScreen />
      ) : (
        <FlatList
          style={{paddingVertical: 10, flex: 1}}
          data={data}
          ListHeaderComponent={<Title />}
          renderItem={({item, index}) => (
            <View style={styles.item} key={index}>
              <Text style={styles.text}>{item?.fact}</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

function Title() {
  return (
    <View style={{marginBottom: 10}}>
      <Text style={styles.title}>Cat Fact Ninja</Text>
      <Text style={{textAlign: 'center', fontSize: 12}}>
        (Swipe up to load more facts)
      </Text>
    </View>
  );
}

const LoadingScreen = () => (
  <View style={styles.loadingScreen}>
    <Text>Load Data</Text>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default App;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  loadingScreen: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
