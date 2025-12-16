import React from 'react';
import { View } from 'react-native';
import useTheme from '../hooks/useTheme';


export default function Section({ children, gap = 14, style }) {
  const { theme } = useTheme();
  return <View style={[{ gap, marginBottom: theme.spacing(2) }, style]}>{children}</View>;
}
