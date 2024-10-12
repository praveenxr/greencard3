import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import styles from './styles';
import QuestionSlide from './QuestionSlide';
import Header from './Header'; // Import the Header component
import AppTabs from './AppTabs';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
      refreshing: false,
      error: null, // Add an error state
      currentSlide: 1, // Track the current slide
      totalSlides: 0,  // Total number of slides
    };
  }

  componentDidMount() {
    console.log("Route params:", this.props.route.params); // Log route params

    // Fetch questions when the component mounts
    this.fetchQuestions();

    // Add a listener to refresh the screen when it comes into focus
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchQuestions(); // Re-fetch questions when the screen is focused
    });
  }

  componentWillUnmount() {
    // Remove the focus listener when the component unmounts
    if (this.focusListener) {
      this.focusListener();
    }
  }

  fetchQuestions = async () => {
    const { category } = this.props.route.params;

    console.log("Category received:", category.id);

    if (!category || !category.id) {
      console.error("Category not provided or invalid");
      return;
    }

    try {
      // Add a cache-busting query parameter using a timestamp
      const url = `https://webcruiser.in/greencard/q3.php?timestamp=${new Date().getTime()}`;

      const response = await axios.post(url, {
        action: 'listquestionsbycategory',
        category_id: category.id,
      });

      // Log the response data
      console.log("API Response:", response.data);

      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        this.setState({
          questions: response.data,
          loading: false,
          refreshing: false,
          totalSlides: response.data.length, // Set the total slides
        });
      } else {
        console.error("Unexpected response format");
        this.setState({ questions: [], loading: false, refreshing: false, error: "Unexpected response format" });
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      this.setState({ loading: false, refreshing: false, error: "Failed to fetch questions" });
    }
  };

  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchQuestions();
    });
  };

  handleIndexChanged = (index) => {
    this.setState({ currentSlide: index + 1 }); // Add 1 because index starts from 0
  };

  render() {
    const { questions, loading, refreshing, error, currentSlide, totalSlides } = this.state;
    const { color } = this.props.route.params;
    const { navigation } = this.props; // Destructure navigation

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1dbf73" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />}
      >
        <Header navigation={navigation} />
        <Swiper
          showsButtons={true}
          loop={false}
          showsPagination={false} // Disable dot pagination
          onIndexChanged={this.handleIndexChanged} // Track current slide index
        >
          {questions.map((item) => (
            <QuestionSlide key={item.id} item={item} backgroundColor={color} />
          ))}
        </Swiper>

        {/* Display current slide number and total slides */}
        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>
            {currentSlide} / {totalSlides}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default HomeScreen;
