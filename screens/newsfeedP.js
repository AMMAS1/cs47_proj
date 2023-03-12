import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';
import { ArticleP } from './articleP';

const NewsfeedP = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('https://newsapi.org/v2/everything?q=stock&apiKey=835bcf4e46804b09b31c2253ebed2cc6')
      .then(response => setArticles(response.data.articles))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ArticleP', { article: item })}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={item => item.url}
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 16,
  },
  webview: {
    flex: 1,
  },
});

export default NewsfeedP;
