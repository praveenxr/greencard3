import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    try {
      const response = await axios.get('https://ssserv.com/q.php'); // Replace with your API URL
      this.setState({ questions: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching questions:', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { questions, loading } = this.state;

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1dbf73" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
       <Swiper
  showsButtons={true}
  loop={false}
  showsPagination={true}
  dotStyle={{
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  }}
  activeDotStyle={{
    backgroundColor: '#1dbf73',
    width: 8,
    height: 8,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  }}
  paginationStyle={{
    bottom:130, // Position the bullets at the top
    left: 110,
    right: 100,
  }}
>
    {questions.map((item) => (
      <QuestionSlide key={item.id} item={item} />
    ))}
  </Swiper>
      </View>
    );
  }
}

const QuestionSlide = ({ item }) => {

  const { category = "General", question = "No question provided", answer = "No answer available" } = item;

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <View style={styles.slide}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.question}>{question}</Text>
    
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    opacity: 0.8,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    borderWidth: 5,
    margin: 30,
    marginBottom: 150,
  },
  category:{
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight:'bold',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  answer: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
    textAlign: 'center',
  },
  flashcardButton: {
    marginTop: 20,
    fontSize: 16,
    color: '#1dbf73',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
