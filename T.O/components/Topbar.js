import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { tokens as t } from '../constants/ui';
import { useAuth } from '../scripts/providers/AuthContext';
import { useTenant } from '../scripts/providers/TenantContext';

export default function Topbar() {
  const { user, logout } = useAuth();
  const { tenant } = useTenant();
  return (
    <View style={{
      height:56, borderBottomWidth:1, borderColor:t.color.border,
      backgroundColor:t.color.card, paddingHorizontal:16, alignItems:'center', flexDirection:'row', justifyContent:'space-between'
    }}>
      <Text style={{ color:t.color.text, fontWeight:'800' }}>T.O. Assist {Platform.OS==='web' ? '• Web' : ''}</Text>
      <View style={{ flexDirection:'row', gap:12, alignItems:'center' }}>
        <Text style={{ color:t.color.muted, fontSize:12 }}>{tenant.name}</Text>
        {user ? (
          <Pressable onPress={logout} style={{ paddingVertical:8, paddingHorizontal:12, borderRadius:8, backgroundColor:t.color.primarySoft }}>
            <Text style={{ color:t.color.text, fontWeight:'700' }}>Sair</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
