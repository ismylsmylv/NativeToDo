import React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CompletedButton from './components/button';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <ImageBackground
            style={styles.imageHero}
            source={require('./img/background4.png')}>
            <Text style={styles.backgroundContainerText}>Welcome back</Text>
          </ImageBackground>
        </View>
        <View>
          <View>
            <Text>todo</Text>
            <CompletedButton />
          </View>
        </View>
      </ScrollView>
      <View>
        <Text>input here</Text>
        <Text>button will be here</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    borderColor: '#4260f5',
    borderWidth: 4,
  },
  imageHero: {
    zIndex: 30,
    height: 150,
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backgroundContainerText: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: '500',
    color: 'white',
  },
});

export default App;
