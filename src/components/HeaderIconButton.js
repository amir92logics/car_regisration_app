import React from 'react';
import {StyleSheet} from 'react-native';

import {IconButton} from './IconButton';

export function HeaderIconButton({name, size, onPress}) {
  return <IconButton name={name} size={size} style={styles.container} onPress={onPress} />;
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
});
