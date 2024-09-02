import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import styles from './styles';
import QuestionSlide from './QuestionSlide';

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
      const timestamp = new Date().getTime(); // Cache-busting parameter
      const response = await axios.get(`https://webcruiser.in/greencard/q3.php?timestamp=${timestamp}`);
      this.setState({ questions: response.data, loading: false, refreshing: false });
    } catch (error) {
      console.error('Error fetching questions:', error);
      this.setState({ loading: false, refreshing: false });
    }
  };

  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchQuestions();
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />}
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

export default HomeScreen;
