import React from 'react';
import { View, Text } from 'react-native';
import useTheme from '../hooks/useTheme';


export default function Avatar({ name = 'P', size = 40 }) {
  const { theme } = useTheme();
  const initials = name.split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase();
  return (
    <View style={{
      width:size, height:size, borderRadius:size/2,
      backgroundColor: theme.colors.primary + '22',
      alignItems:'center', justifyContent:'center'
    }}>
      <Text style={{ color: theme.colors.primary, fontWeight:'800' }}>{initials}</Text>
    </View>
  );
}
