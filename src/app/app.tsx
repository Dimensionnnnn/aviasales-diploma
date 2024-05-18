import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';

import { persistor, store } from '@shared/store';
import { themes } from '@shared/ui/styles/themes';

import { AppNavigator } from './navigation/app/app';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ThemeProvider theme={themes.default}>
            <GestureHandlerRootView style={gestureHandlerStyle}>
              <AppNavigator />
            </GestureHandlerRootView>
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;

const gestureHandlerStyle = {
  flex: 1,
};
