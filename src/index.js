import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DragExample from './DragExample/index';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Demo showing drag select!</Text>
        <DragExample></DragExample>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 35,
    alignItems: 'center'
    // justifyContent: 'center',
  },
});
