import React, { useState } from 'react';
import { View, Alert, Pressable, Text, ScrollView } from 'react-native';
import useTheme from '../../hooks/useTheme';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Title, Caption } from '../../components/Typography';

const API = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3333';

export default function CrisisForm() {
  const { theme } = useTheme();
  const [severity, setSeverity] = useState('1');
  const [text, setText] = useState('');

  async function submit() {
    try {
      const res = await fetch(`${API}/crises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (global.token || '') },
        body: JSON.stringify({ childId: global.childId || 'demo-child', severity: Number(severity), text })
      });
      const data = await res.json();
      if (data.highRisk) {
        Alert.alert('Atenção', 'Sinais de alto risco. Procure emergência (192) imediatamente.');
      } else {
        Alert.alert('Orientações', data?.recommendation?.content || 'Ok');
      }
    } catch (e) { Alert.alert('Erro', e.message); }
  }

  const Chip = ({ value }) => (
    <Pressable onPress={()=>setSeverity(value)} style={{
      paddingVertical:10, paddingHorizontal:14, borderRadius:999,
      borderWidth:1, borderColor: theme.colors.border,
      backgroundColor: severity===value ? theme.colors.primary : 'transparent'
    }}>
      <Text style={{ color: severity===value ? '#fff' : theme.colors.text, fontWeight:'700' }}>Grau {value}</Text>
    </Pressable>
  );

  return (
    <ScrollView style={{ flex:1, backgroundColor: theme.colors.bg }} contentContainerStyle={{ padding:20 }}>
      <Card>
        <Title style={{ marginBottom: 8 }}>Relatar crise</Title>

        <View style={{ flexDirection:'row', gap:10, marginBottom: 12 }}>
          <Chip value="1" /><Chip value="2" /><Chip value="3" />
        </View>

        <Input
          label="Descreva o que aconteceu"
          placeholder="Duração, gatilhos, comportamentos observados..."
          multiline
          value={text}
          onChangeText={setText}
        />

        <View style={{ height: 12 }} />
        <Button title="Enviar" onPress={submit} />
        <View style={{ height: 8 }} />
        <Caption>Conteúdo educacional. Não substitui avaliação profissional. Emergência: 192.</Caption>
      </Card>
    </ScrollView>
  );
}
