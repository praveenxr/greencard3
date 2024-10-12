import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import HelpScreen from './HelpScreen';
import QuestionListScreen from './QuestionListScreen';
import FeedbackScreen from './FeedbackScreen';
import FAQScreen from './FAQScreen';
import CategoryScreen from './CategoryScreen';
import { AuthContext } from './AuthContext'; // Import AuthContext

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { isLoggedIn } = useContext(AuthContext); // Access login state

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Help') {
            iconName = focused ? 'help' : 'help-outline';
          } else if (route.name === 'Questions') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Slide') {
            iconName = focused ? 'list' : 'list-outline';
          }
		  else if (route.name === 'Category') {
            iconName = focused ? 'grid' : 'grid';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1dbf73',
        tabBarInactiveTintColor: 'gray',
		 tabBarStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      borderTopWidth: 0,
      elevation: 0, // For Android: remove shadow
      shadowOpacity: 0, // For iOS: remove shadow
      height: 60, // Set height to make sure no white space appears behind the tab
    },
      })}
    >
	   <Tab.Screen 
        name="Category" 
        component={CategoryScreen} 
        options={({ route, navigation }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: (route.name === 'Category')
            ? { display: 'none' }  // Hide the tab bar on the Category screen
            : {},                   // Show the tab bar on other screens
        })} 
      />
      
<Tab.Screen name="Slide" component={HomeScreen}  options={{
   tabBarShowLabel: false,  // Hide the label
    tabBarIcon: () => null,  // Hide the icon
    headerShown: false,      // Keep the header hidden
    tabBarButton: () => null // Hide the tab button completely
  }} />
  
  <Tab.Screen name="Feedback" component={FeedbackScreen}  options={{
   tabBarShowLabel: false,  // Hide the label
    tabBarIcon: () => null,  // Hide the icon
    headerShown: false,      // Keep the header hidden
    tabBarButton: () => null // Hide the tab button completely
  }} />
       <Tab.Screen name="FAQ" component={FAQScreen}  options={{
   tabBarShowLabel: false,  // Hide the label
    tabBarIcon: () => null,  // Hide the icon
    headerShown: false,      // Keep the header hidden
    tabBarButton: () => null // Hide the tab button completely
  }} />
      {/* <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />*/}
      {isLoggedIn && (
        <Tab.Screen 
          name="Questions" 
          component={QuestionListScreen} 
          options={{ headerShown: false }} // Hide header for Questions screen
        />
      )}
    </Tab.Navigator>
  );
};

export default AppTabs;
