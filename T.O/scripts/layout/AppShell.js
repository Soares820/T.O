import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { tokens as t } from '../../constants/ui';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import Button from '../../components/Button';

export default function AppShell({ render }) {
  const [route, setRoute] = useState('dashboard');

  const MobileTabs = () => (
    <View style={{ flexDirection:'row', borderTopWidth:1, borderColor:t.color.border, backgroundColor:t.color.card }}>
      {[
        { key:'dashboard', label:'Início' },
        { key:'patients',  label:'Pacientes' },
        { key:'content',   label:'Conteúdos' },
        { key:'settings',  label:'Config' },
      ].map(tab => (
        <View key={tab.key} style={{ flex:1, padding:10 }}>
          <Button title={tab.label} variant={route===tab.key?'primary':'outline'} onPress={()=>setRoute(tab.key)} />
        </View>
      ))}
    </View>
  );

  return (
    <View style={{ flex:1, backgroundColor: t.color.bg }}>
      <Topbar />
      <View style={{ flex:1, flexDirection:'row' }}>
        <Sidebar current={route} onNavigate={setRoute} />
        <View style={{ flex:1, padding:16 }}>
          {render(route)}
        </View>
      </View>
      {Platform.OS!=='web' ? <MobileTabs /> : null}
    </View>
  );
}
