import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from './Header'; // Import the Header component

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

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

  render() {
    const { categories, loading } = this.state;
    const { navigation } = this.props; // Destructure navigation

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1dbf73" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {/* Display the custom header */}
        <Header navigation={navigation} />

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Display 1 item per row
          renderItem={({ item, index }) => {
            const backgroundColor = this.getBackgroundColor(index);
            return (
            <TouchableOpacity onPress={() => this.handleCategoryPress(item, backgroundColor)}>


                <View style={[styles.categoryItem, { backgroundColor }]}>
                  <Text style={styles.categoryText}>{item.category_name}</Text>
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
  categoryText: {
    fontSize: 13,
    color: '#fff',
  },
});

export default CategoryScreen;
