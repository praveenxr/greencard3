import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './components/AuthContext';
import HomeStack from './components/HomeStack';
import QuestionListScreen from './components/QuestionListScreen';
import HelpScreen from './components/HelpScreen';
import AppTabs from './components/AppTabs';
import EditQuestionScreen from './components/EditQuestionScreen';
import AddQuestionScreen from './components/AddQuestionScreen';
import LoginScreen from './components/LoginScreen';
import ForgotPassword from './components/ForgotPasswordScreen';
import QuestionDetailScreen from './components/QuestionDetailScreen';
import HomeScreen from './components/HomeScreen';
import Resetpassword from './components/Resetpassword';

import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="EditQuestion" component={EditQuestionScreen} options={{ title: 'Edit Question' }} />
    <Stack.Screen name="AddQuestion" component={AddQuestionScreen} options={{ title: 'Add Question' }} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Admin Login' }} />
	 <Stack.Screen name="Resetpassword" component={Resetpassword} options={{ title: 'Reset password' }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} />
    <Stack.Screen name="QuestionDetail" component={QuestionDetailScreen} options={{ title: 'Question Detail' }}/>
  </Stack.Navigator>
);

const CustomDrawerContent = (props) => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>

      <DrawerItem
        label="Feedback"
        icon={({ size }) => (
          <Ionicons name="list-circle-outline" size={size} color="#1dbf73" />
        )}
        onPress={() => props.navigation.navigate('Feedback')}
      />
      <DrawerItem
        label="FAQ"
        icon={({ size }) => (
          <Ionicons name="list-circle-outline" size={size} color="#1dbf73" />
        )}
        onPress={() => props.navigation.navigate('FAQ')}
      />
	   <DrawerItem
        label="Reset password"
        icon={({ size }) => (
          <Ionicons name="list-circle-outline" size={size} color="#1dbf73" />
        )}
        onPress={() => props.navigation.navigate('Resetpassword')}
      />
      {!isLoggedIn ? (
        <DrawerItem
          label="Login"
          icon={({ size }) => (
            <Ionicons name="log-in-outline" size={size} color="#1dbf73" />
          )}
          onPress={() => props.navigation.navigate('LoginScreen')}
        />
      ) : (
        <DrawerItem
          label="Logout"
          icon={({ size }) => (
            <Ionicons name="log-out-outline" size={size} color="#1dbf73" />
          )}
          onPress={() => {
            logout();
            props.navigation.navigate('LoginScreen');
          }}
        />
      )}
    </DrawerContentScrollView>
  );
};

const App = () => {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from hiding
      // Perform any necessary tasks here, e.g., loading resources
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a loading delay
      await SplashScreen.hideAsync(); // Hide the splash screen
    }

    prepare();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="AppStack" component={AppStack} options={{ headerShown: false, drawerLabel: () => null }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
