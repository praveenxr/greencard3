import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  listItemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  listItemContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  listLconEdit: {
    paddingRight: 10,
  },
  listcategory: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1dbf73',
    marginBottom: 5,
  },
  questionTextList: {
    fontSize: 20,
    color: '#333',
    lineHeight: 22,
    textAlign: 'left',
  },
  questionText: {
    fontSize: 20,
    color: '#333',
    lineHeight: 30,
    justifyContent: 'center',
    textAlign: 'center',
  },
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
   height:'100%',
    
    backgroundColor: '#e6fff2',
    borderRadius: 10,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    
  },
  scrollContainer: {
    flex: 1,
    maxHeight: 300, // Adjust this based on your design
    position: 'relative', // Needed for overlaying the scroll indicator
  },
  scrollView: {
    flex: 1,
  },
  category: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listQuestionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'left',
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
    bottom: 20,
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
   
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#1dbf73',
    padding: 15, // Reduced padding for a smaller button
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30, // Circular shape
    position: 'absolute', // Positioning it to the bottom-right corner
    bottom: 20,
    right: 20,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16, // Slightly smaller text
    fontWeight: 'bold',
    marginLeft: 5, // Spacing between icon and text
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#1dbf73',
    padding: 10,
    borderRadius: 5,
  },
  emptyText: {
    textAlign: 'center',
    padding: 50,
    fontSize: 16, // Slightly smaller text
    fontWeight: 'bold',
  },
   scrollIndicator: {
    position: 'absolute',
    bottom: -55,
   
    alignItems: 'center',
	left:80,
  },
  
  scrollText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  paginationContainer: {
  alignItems: 'center',
  marginVertical: 60,
  position:'absolute',
  bottom:0,
  left:'46%',
},
paginationText: {
  fontSize: 16,
  color: '#000',
},

});

export default styles;
