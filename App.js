import React from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './src/navigator/MainNavigator';
import TryCodeScreen from './src/screens/TryCodeScreen';
import NoteListScreen from './src/screens/NoteListScreen';
import AddNoteScreen from './src/screens/AddNoteScreen';

// import SecondScreen from './src/screens/SecondScreen';

const App = () => {
  return (
    <SafeAreaProvider>
      
      <MainNavigator />
      {/* <NoteListScreen /> */}
      {/* <AddNoteScreen /> */}


    </SafeAreaProvider>
  );
};

export default App;
