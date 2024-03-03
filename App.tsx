import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CompletedButton from './components/button';

function App(): React.JSX.Element {
  const [input, setinput] = useState('');
  const [todos, settodos] = useState([]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <ImageBackground
            style={styles.imageHero}
            source={require('./img/background4.png')}>
            <Text style={styles.backgroundContainerText}>Welcome back</Text>
          </ImageBackground>
          {/* <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.linearGradient}></LinearGradient> */}
        </View>
        <View>
          {todos &&
            todos.map(elem => {
              return (
                <View style={styles.todoCard} key={elem.date}>
                  <Text style={styles.todoCardTitle}>{elem.title}</Text>
                  <CompletedButton />
                </View>
              );
            })}
        </View>
        <View>
          <TextInput
            placeholder="Add a task"
            onChangeText={e => setinput(e)}
            defaultValue={input}
            onSubmitEditing={e => {
              const todo = {
                title: input,
                date: Date.now(),
                comleted: false,
              };
              settodos([...todos, todo]);
            }}
          />
          <Text>button will be here</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    // borderColor: '#4260f5',
    // borderWidth: 4,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  imageHero: {
    zIndex: 30,
    height: 100,
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
  todoCard: {
    borderColor: '#4260f5',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoCardTitle: {
    alignSelf: 'flex-start',
  },
  todoCardCompleteBtn: {
    alignSelf: 'flex-end',
  },
});

export default App;
