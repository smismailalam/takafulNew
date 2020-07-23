import {AppRegistry} from 'react-native';
import App from './App';
import {name as PakTakaful} from './app.json';
import bgMessaging from './bgMessaging';
import 'react-native-gesture-handler';
AppRegistry.registerComponent(PakTakaful, () => App);
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging,
);
