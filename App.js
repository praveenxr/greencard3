import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './components/HomeStack';
import QuestionListScreen from './components/QuestionListScreen';
import HelpScreen from './components/HelpScreen';
import AppTabs from './components/AppTabs';
import EditQuestionScreen from './components/EditQuestionScreen'; 
import AddQuestionScreen from './components/AddQuestionScreen';// Import new screen
import { EditQuestionProvider } from './components/EditQuestionContext'; // Import context provider

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
    <Stack.Screen name="EditQuestion" component={EditQuestionScreen} options={{ title: 'Edit Question' }} />
	   <Stack.Screen name="AddQuestion" component={AddQuestionScreen} options={{ title: 'Add Question' }} />
  </Stack.Navigator>
);

const App = () => (
  <EditQuestionProvider>
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="AppStack" component={AppStack} options={{ headerShown: false, drawerLabel: () => null }} />
        <Drawer.Screen name="Help" component={HelpScreen} />
		<Drawer.Screen name="Questions" component={QuestionListScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  </EditQuestionProvider>
);

export default App;
