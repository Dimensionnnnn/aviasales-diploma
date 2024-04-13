/**
 * @format
 */
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

import App from '@app/app';

import { name as appName } from './app.json';

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
