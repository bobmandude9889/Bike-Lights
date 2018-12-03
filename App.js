import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './app/screens/HomeScreen'
import ProfileDesignerScreen from './app/screens/ProfileDesignerScreen'
import PatternEditorScreen from './app/screens/PatternEditorScreen';

const Navigator = createStackNavigator({
  Home: {screen: HomeScreen},
  ProfileDesigner: {screen: ProfileDesignerScreen},
  PatternEditor: {screen: PatternEditorScreen}
});

const App = createAppContainer(Navigator);

export default App;