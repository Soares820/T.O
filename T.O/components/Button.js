import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Button({ title, onPress, gradient = true }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      {gradient ? (
        <LinearGradient
          colors={['#2563eb', '#3b82f6']}
          style={styles.button}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      ) : (
        <Text style={[styles.text, { color: '#2563eb', textAlign: 'center' }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
