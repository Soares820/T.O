import React from 'react';
import { View, Text } from 'react-native';
import { tokens as t } from '../constants/ui';
import Card from './Card';

export default function KPI({ label, value, hint, tone='primary' }) {
  const bar = { primary: t.color.primary, success: t.color.success, warning: t.color.warning, danger: t.color.danger }[tone];
  return (
    <Card style={{ gap: 6 }}>
      <Text style={{ color: t.color.muted, fontSize:12 }}>{label}</Text>
      <Text style={{ color: t.color.text, fontSize:24, fontWeight:'800' }}>{value}</Text>
      {hint ? <Text style={{ color: t.color.muted, fontSize:12 }}>{hint}</Text> : null}
      <View style={{ height:4, backgroundColor: t.color.card, borderRadius: 4, marginTop: 8 }}>
        <View style={{ width:'60%', height:4, backgroundColor: bar, borderRadius: 4 }} />
      </View>
    </Card>
  );
}
