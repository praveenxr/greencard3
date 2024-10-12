import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Header from './Header'; // Import the Header component
import * as Font from 'expo-font';

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true,
      fontsLoaded: false, // State to track if the font has loaded
    };
  }

  async componentDidMount() {
    await this.loadFonts(); // Load the fonts first
    this.fetchCategories(); // Then fetch the categories
  }

  loadFonts = async () => {
    try {
      await Font.loadAsync({
        'FuturaPTMedium': require('../assets/fonts/Futura Medium.otf'), // Ensure correct path
      });
      this.setState({ fontsLoaded: true });
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  };

  fetchCategories = async () => {
    try {
      const response = await axios.post('https://webcruiser.in/greencard/q3.php', {
        action: 'listcategories',
      });
      this.setState({ categories: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching categories:', error);
      this.setState({ loading: false });
    }
  };

  handleCategoryPress = (category, color) => {
    const { navigation } = this.props;
    console.log("Navigating with category ID:", category); // Log the entire category object
    navigation.navigate('Slide', { category, color });
  };

  getBackgroundColor = (index) => {
    const colors = ['#FFB6C1', '#ADD8E6', '#90EE90', '#FFD700', '#FF7F50', '#6A5ACD'];
    return colors[index % colors.length];
  };

  getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'general':
        return require('../assets/icon/General.png');
      case 'daily life':
        return require('../assets/icon/Daily-life.png');
      case 'family':
        return require('../assets/icon/Family.png');
      case 'finances':
        return require('../assets/icon/Finances.png');
      case 'wedding':
        return require('../assets/icon/Wedding.png');
      case 'relationship history':
        return require('../assets/icon/Relationship-history.png');
      case 'household':
        return require('../assets/icon/Household.png');
      case 'living conditions':
        return require('../assets/icon/Living-conditions.png');
      case 'future plans':
        return require('../assets/icon/Future-plans.png');
      default:
        return require('../assets/icon/App-Icon.png');
    }
  };

  render() {
    const { categories, loading, fontsLoaded } = this.state;
    const { navigation } = this.props;

    if (!fontsLoaded) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1dbf73" />
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1dbf73" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} />

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item, index }) => {
            const backgroundColor = this.getBackgroundColor(index);
            const categoryIcon = this.getCategoryIcon(item.category_name);
            return (
              <TouchableOpacity onPress={() => this.handleCategoryPress(item, backgroundColor)}>
                <View style={[styles.categoryItem, { backgroundColor }]}>
                  <Image
                    source={categoryIcon}
                    style={styles.categoryIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.categoryText}>{item.category_name}</Text>
                  <Text style={styles.categoryCount}>{item.question_count}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    minWidth: '50%',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'FuturaPTMedium', // Use Futura Medium font
  },
  categoryCount: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'FuturaPTMedium', // Use Futura Medium font
  },
});

export default CategoryScreen;
