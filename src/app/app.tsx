import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ThemeProvider } from 'styled-components/native';

import { PrimaryButton } from '@shared/ui/buttons/primary-button/primary-button';
import { UIDefaultInput } from '@shared/ui/inputs/default-input/default-input';
import { UILabelInput } from '@shared/ui/inputs/label-input/label-input';
import { themes } from '@shared/ui/styles/themes';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <ThemeProvider theme={themes.default}></ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
