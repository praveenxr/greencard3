import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './components/AuthContext'; // Ensure correct import
import HomeStack from './components/HomeStack';
import QuestionListScreen from './components/QuestionListScreen';
import HelpScreen from './components/HelpScreen';
import AppTabs from './components/AppTabs';
import EditQuestionScreen from './components/EditQuestionScreen';
import AddQuestionScreen from './components/AddQuestionScreen';
import LoginScreen from './components/LoginScreen';
import ForgotPassword from './components/ForgotPasswordScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
    <Stack.Screen name="EditQuestion" component={EditQuestionScreen} options={{ title: 'Edit Question' }} />
    <Stack.Screen name="AddQuestion" component={AddQuestionScreen} options={{ title: 'Add Question' }} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Admin Login' }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} />
  </Stack.Navigator>
);

const CustomDrawerContent = (props) => {
  const { isLoggedIn, logout } = useContext(AuthContext); // Ensure correct context access

  return (
    <DrawerContentScrollView {...props}>

	  
      <DrawerItem
        label="Help"
        onPress={() => props.navigation.navigate('Help')}
      />
      <DrawerItem options={{ headerShown: false }} 
        label="Questions"
        onPress={() => props.navigation.navigate('Questions')} 
      />
      {!isLoggedIn ? (
        <DrawerItem
          label="Login"
          onPress={() => props.navigation.navigate('LoginScreen')}
        />
      ) : (
        <DrawerItem  
          label="Logout"
          onPress={() => {
            logout(); // Call logout function from context
            props.navigation.navigate('LoginScreen');
          }}
        />
      )}
    </DrawerContentScrollView>
  );
};

const App = () => {
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
