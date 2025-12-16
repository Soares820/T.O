import React from 'react';
import { Text } from 'react-native';
import useTheme from '../hooks/useTheme';


export const Title = ({ children, style }) => {
  const { theme } = useTheme();
  return <Text style={[{ fontSize: 26, fontWeight: '800', color: theme.colors.text }, style]}>{children}</Text>;
};

export const Subtitle = ({ children, style }) => {
  const { theme } = useTheme();
  return <Text style={[{ fontSize: 16, color: theme.colors.muted }, style]}>{children}</Text>;
};

export const Caption = ({ children, style }) => {
  const { theme } = useTheme();
  return <Text style={[{ fontSize: 12, color: theme.colors.muted }, style]}>{children}</Text>;
};
