import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Card({ icon, title, description, onPress }) {
  const isWeb = Platform.OS === 'web';
  const cardWidth = isWeb && width > 800 ? width / 3.5 : '100%';

  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={28} color="#3b82f6" />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 18,
    padding: 22,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    transition: 'all 0.2s ease-in-out',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(59,130,246,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textBox: {
    flexShrink: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  desc: {
    color: '#9ca3af',
    fontSize: 14,
    lineHeight: 20,
  },
});
