import React, { useEffect, useMemo, useState } from 'react';
import { View, TextInput, Pressable, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import useTheme from '../../hooks/useTheme';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { Title } from '../../components/Typography';
import { io } from 'socket.io-client';

const WS = process.env.EXPO_PUBLIC_WS_URL || 'http://localhost:3333';

export default function Chat() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socket = useMemo(() => io(WS, { transports: ['websocket'] }), []);

  useEffect(() => {
    const roomId = global.sessionId || 'lobby';
    socket.emit('join', roomId);
    socket.on('message', (m) => setMessages(prev => [...prev, m]));
    return () => socket.disconnect();
  }, [socket]);

  function send() {
    if (!text.trim()) return;
    socket.emit('message', { roomId: global.sessionId || 'lobby', from: 'Você', text });
    setText('');
  }

  const Bubble = ({ me, text }) => (
    <View style={{
      alignSelf: me ? 'flex-end' : 'flex-start',
      backgroundColor: me ? theme.colors.primary : theme.colors.surface,
      borderWidth: me ? 0 : 1,
      borderColor: theme.colors.border,
      padding: 10, borderRadius: 14, maxWidth: '80%'
    }}>
      <Text style={{ color: me ? '#fff' : theme.colors.text }}>{text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex:1, backgroundColor: theme.colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{ padding: 20, paddingBottom: 10 }}>
        <Title>Chat 24/7</Title>
      </View>

      <FlatList
        contentContainerStyle={{ gap: 10, paddingHorizontal: 16, paddingBottom: 16 }}
        data={messages}
        keyExtractor={(item, idx)=>String(item.ts||idx)}
        renderItem={({item}) => (
          <View style={{ flexDirection:'row', gap:8, alignItems:'flex-end', justifyContent: item.from==='Você'?'flex-end':'flex-start' }}>
            {item.from !== 'Você' ? <Avatar name={item.from || 'P'} /> : null}
            <Bubble me={item.from==='Você'} text={item.text} />
          </View>
        )}
      />

      <Card style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
        <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
          <TextInput
            placeholder="Escreva sua mensagem…"
            placeholderTextColor={theme.colors.muted}
            value={text}
            onChangeText={setText}
            style={{ flex:1, padding:12, color: theme.colors.text }}
          />
          <Pressable onPress={send} style={{ backgroundColor: theme.colors.primary, paddingHorizontal:16, paddingVertical:10, borderRadius: 12 }}>
            <Text style={{ color: '#fff', fontWeight:'700' }}>Enviar</Text>
          </Pressable>
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
}
