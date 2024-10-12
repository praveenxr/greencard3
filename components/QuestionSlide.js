import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icon for scroll indicator
import styles from './styles';

const QuestionSlide = ({ item, backgroundColor }) => { // Add backgroundColor prop
  const [isScrollable, setIsScrollable] = useState(false); // State to check if content is scrollable
  const [isScrolled, setIsScrolled] = useState(false); // State to track if the user has started scrolling

  // Measure content height and compare to ScrollView height
  const handleContentSizeChange = (contentWidth, contentHeight) => {
    setIsScrollable(contentHeight > 300); // Set based on your maxHeight (e.g., 300)
  };

  // Detect if the user has started scrolling
  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 0) {
      setIsScrolled(true);
    }
  };

  return (
    <View style={[styles.slide, { backgroundColor }]}> 
      <Text style={styles.category}>{item.category}</Text>

      <View style={styles.scrollContainer}>
        <ScrollView
          style={styles.scrollView}
          onContentSizeChange={handleContentSizeChange}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Ensure scroll events are captured smoothly
          showsVerticalScrollIndicator={false} // Hide default scroll indicator
        >
          <Text style={styles.questionText}>{item.question}</Text>
        </ScrollView>

        {/* Display scroll indicator if content is scrollable and not yet scrolled */}
        {isScrollable && !isScrolled && (
          <View style={styles.scrollIndicator}>
            <Ionicons name="chevron-down" size={24} color="#888" />
            <Text style={styles.scrollText}>Scroll for more</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default QuestionSlide;
