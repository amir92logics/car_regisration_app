import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';

export function IconButton({name, size, style, onPress}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icon name={name} size={size} color={colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
