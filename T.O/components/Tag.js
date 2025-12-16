import React from 'react';
import { View, Text } from 'react-native';
import useTheme from '../hooks/useTheme'; 

export default function Tag({ children, tone = 'info', style }) {
  const { theme } = useTheme();

  const backgroundColor = {
    info: theme.colors.info,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
  }[tone] || theme.colors.info;

  return (
    <View
      style={[
        {
          backgroundColor,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 12,
        },
        style,
      ]}
    >
      <Text style={{ color: theme.colors.textOnPrimary, fontWeight: '600' }}>
        {children}
      </Text>
    </View>
  );
}
