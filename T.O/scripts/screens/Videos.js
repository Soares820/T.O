import React from 'react';
import { View, Text, Linking, ScrollView } from 'react-native';
import useTheme from '../../hooks/useTheme';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Title, Subtitle } from '../../components/Typography';

const items = [
  { g:1, title:'Técnicas grau 1', url:'https://example.com/grau1' },
  { g:2, title:'Técnicas grau 2', url:'https://example.com/grau2' },
  { g:3, title:'Técnicas grau 3', url:'https://example.com/grau3' },
];

export default function Videos() {
  const { theme } = useTheme();

  return (
    <ScrollView style={{ flex:1, backgroundColor: theme.colors.bg }} contentContainerStyle={{ padding:20, gap:14 }}>
      <Title>Vídeos (graus 1–3)</Title>
      {items.map(v => (
        <Card key={v.g}>
          <View style={{ flexDirection:'row', alignItems:'center', gap:14 }}>
            <View style={{ width:48, height:48, borderRadius:12, backgroundColor: theme.colors.warning + '22', alignItems:'center', justifyContent:'center' }}>
              <Text style={{ fontWeight:'800', color: theme.colors.warning }}>G{v.g}</Text>
            </View>
            <View style={{ flex:1 }}>
              <Subtitle style={{ color: theme.colors.text }}>{v.title}</Subtitle>
              <Text style={{ color: theme.colors.muted }}>Passos visuais e checklists.</Text>
            </View>
            <Button title="Assistir" variant="outline" onPress={() => Linking.openURL(v.url)} />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

