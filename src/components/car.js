import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {BASE_URL} from '../config';
import {Card} from './Card';

export function Car({car, onPress}) {
  console.log('car')

  return (
    <Card onPress={() => onPress({id: car.id})} style={styles.card} >
      <Image
        style={styles.thumb}
        source={{uri: `${car.url.includes('https://') ? '' : 'data:image/png;base64,'}` + car.url}}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{(car.name).toUpperCase()}</Text>
        <Text style={styles.price}>{car.model}</Text>
        <Text style={styles.description}>{car.color}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
  },
});
