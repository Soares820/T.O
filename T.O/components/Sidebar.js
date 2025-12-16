import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { tokens as t } from '../constants/ui';
import { useTenant } from '../scripts/providers/TenantContext';

export default function Sidebar({ current, onNavigate }) {
  if (Platform.OS !== 'web') return null; // só web
  const { tenant } = useTenant();
  const Item = ({ label, keyName }) => (
    <Pressable onPress={()=>onNavigate(keyName)} style={({pressed})=>({
      padding:12, borderRadius:10, backgroundColor: current===keyName ? t.color.primarySoft : 'transparent',
      transform: [{ translateY: pressed?1:0 }]
    })}>
      <Text style={{ color: current===keyName ? t.color.text : t.color.muted, fontWeight:'600' }}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={{ width:260, padding:16, gap:8, borderRightWidth:1, borderColor: t.color.border, backgroundColor: t.color.card }}>
      <Text style={{ color:t.color.text, fontWeight:'800', fontSize:18 }}>{tenant.name}</Text>
      <Text style={{ color:t.color.muted, fontSize:12, marginBottom:8 }}>Plano {tenant.plan}</Text>
      <Item label="Dashboard"  keyName="dashboard" />
      <Item label="Pacientes"   keyName="patients" />
      <Item label="Conteúdos"   keyName="content" />
      <Item label="Configurações" keyName="settings" />
    </View>
  );
}
