'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, VStack, HStack, Text, Input, Button } from '@chakra-ui/react';
import { socket } from '@/app/util/socket';

// Tipos de mensagens
interface Message {
  sender: string; // Nome do remetente
  recipient?: string; // Nome do destinatário (opcional)
  content: string;
  createdAt: string;
}

export default function ChatPage() {
  const { id } = useParams() as { id: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isGroupChat, setIsGroupChat] = useState<boolean>(false);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect(); // Conecta o socket se ainda não estiver conectado
    }

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  // Configuração do chat
  useEffect(() => {
    if (!id) return;

    const isGroup = id.startsWith('group-');
    setIsGroupChat(isGroup);

    if (isGroup) {
      socket.emit('joinGroup', id);
      console.log(`Joined group ${id}`);
    }

    // Listeners para mensagens recebidas
    socket.on('message', (message: Message) => {
      console.log('Group message received:', message);
      setMessages((prev) => [...prev, message]);
    });

    socket.on('privateMessage', (message: Message) => {
      console.log('Private message received:', message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      if (isGroup) {
        socket.emit('leaveGroup', id);
        console.log(`Left group ${id}`);
      }
      socket.off('message');
      socket.off('privateMessage');
    };
  }, [id]);

  // Enviar mensagens
  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        sender: 'Me',
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
                {msg.sender || 'Unknown Sender'}
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <Button colorScheme="blue" onClick={sendMessage}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
