// components/AppTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import HelpScreen from './HelpScreen';
import QuestionListScreen from './QuestionListScreen';
//import EditQuestionScreen from './EditQuestionScreen'; // Import new screen
const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home1') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Help') {
          iconName = focused ? 'help' : 'help-outline';
        } else if (route.name === 'Questions') {
          iconName = focused ? 'list' : 'list-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#1dbf73',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home1" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="Help" component={HelpScreen} />
    <Tab.Screen name="Questions" component={QuestionListScreen} options={{ title: 'Questions' }} />
  </Tab.Navigator>
);

export default AppTabs;
