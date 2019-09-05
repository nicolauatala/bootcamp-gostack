import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

import './src/config/ReactotronConfig';

console.tron.log('AppRegistry.registerComponent');

AppRegistry.registerComponent(appName, () => App);
