'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, VStack, HStack, Text, Input, Button } from '@chakra-ui/react';
import io, { Socket } from 'socket.io-client';

// Tipos de mensagens
interface Message {
  sender: string;
  name: string;
  content: string;
  createdAt: string;
}

const socket: Socket = io('http://localhost:8000'); // URL do backend

export default function ChatPage() {
  const { id } = useParams() as { id: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isGroupChat, setIsGroupChat] = useState<boolean>(false); // Identifica se é grupo ou privado

  useEffect(() => {
    if (!socket.connected) {
      socket.on('connect', () => {
        // Registra o usuário ao conectar
        const userId = 'user-123'; // Substitua pelo ID real do usuário
        const userName = 'John Doe'; // Substitua pelo nome real do usuário
        socket.emit('register', { userId, name: userName });
        console.log('Socket connected:', socket.id);
      });
    }

    return () => {
      socket.off('connect');
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    // Verifica se o chat é um grupo ou privado
    const isGroup = id.startsWith('group-'); // Suposição: grupos começam com "group-"
    setIsGroupChat(isGroup);

    if (isGroup) {
      // Entrar no grupo
      socket.emit('joinGroup', id);
      console.log(`Joined group ${id}`);
    }

    // Receber mensagens em grupo
    socket.on('message', (message: Message) => {
      console.log('Group message received:', message);
      setMessages((prev) => [...prev, message]);
    });

    // Receber mensagens privadas
    socket.on('privateMessage', (message: Message) => {
      console.log('Private message received:', message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      if (isGroup) {
        // Sair do grupo
        socket.emit('leaveGroup', id);
        console.log(`Left group ${id}`);
      }
      socket.off('message');
      socket.off('privateMessage');
    };
  }, [id]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        sender: 'Me',
        name: 'You',
        content: newMessage,
        createdAt: new Date().toISOString(),
      };

      if (isGroupChat) {
        socket.emit('sendMessage', { groupName: id, message: newMessage });
        console.log(`Message sent to group ${id}: ${newMessage}`);
      } else {
        socket.emit('privateMessage', { toUserId: id, message: newMessage });
        console.log(`Private message sent to user ${id}: ${newMessage}`);
      }

      setMessages((prev) => [...prev, message]);
      setNewMessage('');
    }
  };

  return (
    <Box p={4}>
      <VStack align="stretch" spacing={4}>
        <Text fontWeight="bold">Chat: {id}</Text>
        <VStack align="stretch" spacing={2}>
          {messages.map((msg, index) => (
            <Box key={index}>
              {/* Nome do remetente */}
              <Text fontSize="sm" fontWeight="bold" color="gray.600">
                {msg.name || 'Unknown User'}
              </Text>
              {/* Conteúdo da mensagem */}
              <HStack
                alignSelf={msg.sender === 'Me' ? 'flex-end' : 'flex-start'}
                bg={msg.sender === 'Me' ? 'blue.100' : 'gray.100'}
                p={2}
                borderRadius="md"
              >
                <Text>{msg.content}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
        <HStack>
          <Input
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button colorScheme="blue" onClick={sendMessage}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
