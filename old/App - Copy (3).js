import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
  try {
    const response = await axios.get('https://webcruiser.in/q.php', {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    this.setState({ questions: response.data, loading: false, refreshing: false });
  } catch (error) {
    console.error('Error fetching questions:', error);
    this.setState({ loading: false, refreshing: false });
  }
};

  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchQuestions(); // Re-fetch the data and clear cache
    });
  };

  render() {
    const { questions, loading, refreshing } = this.state;

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1dbf73" />
        </View>
      );
    }

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />
        }
      >
        <Swiper
          showsButtons={true}
          loop={false}
          showsPagination={true}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          paginationStyle={styles.paginationStyle}
        >
          {questions.map((item) => (
            <QuestionSlide key={item.id} item={item} />
          ))}
        </Swiper>
      </ScrollView>
    );
  }
}

const QuestionSlide = ({ item }) => (
  <View style={styles.slide}>
    <Text style={styles.category}>{item.category}</Text>
    <Text style={styles.questionText}>{item.question}</Text>
  </View>
);

const Header = ({ navigation }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={30} color="black" />
    </TouchableOpacity>
    <Image
      source={require('./assets/applogo.png')}
      style={{ left: -30, width: 250, height: 50, resizeMode: 'contain' }}
    />
  </View>
);

const HomeStack = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <Header navigation={navigation} />
    <HomeScreen />
  </View>
);

const HelpScreen = () => (
  <View style={styles.centeredView}>
    <Text>Help Screen</Text>
  </View>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home1') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Help') {
          iconName = focused ? 'help' : 'help';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#1dbf73',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home1" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="Help" component={HelpScreen} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false, drawerLabel: () => null }} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90EE90',
    borderWidth: 5,
    margin: 30,
    marginBottom: 50,
    paddingTop: 100,
    paddingBottom: 100,
  },
  category: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDotStyle: {
    backgroundColor: '#1dbf73',
    width: 8,
    height: 8,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  paginationStyle: {
    bottom: 130,
    left: 110,
    right: 100,
  },
  header: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
