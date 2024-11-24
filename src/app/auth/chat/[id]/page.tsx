'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, VStack, HStack, Text, Input, Button, IconButton } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { socket } from '@/app/util/socket';
import { groupChats } from '../../chatsOptions/page';

// Tipos de mensagens
interface Message {
  sender: string; // Nome do remetente
  content: string;
  createdAt: string;
  fileType?: string; // Tipo do arquivo (ex: 'image', 'document')
  fileName?: string; // Nome do arquivo, se aplicável
}

interface ConnectedUser {
  id: string;
  name: string;
}

export default function ChatPage() {
  const { id } = useParams() as { id: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isGroupChat, setIsGroupChat] = useState<boolean>(false);
  const [chatName, setChatName] = useState<string>(''); // Nome do chat
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);

  // Conexão inicial do socket e configuração de usuários conectados
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.emit('getConnectedUsers');
    socket.on('connectedUsers', (users: ConnectedUser[]) => {
      setConnectedUsers(users);
    });

    return () => {
      socket.off('connect');
      socket.off('connectedUsers');
    };
  }, []);

  // Configuração do chat (grupo ou privado)
  useEffect(() => {
    if (!id) return;

    const isGroup = id.startsWith('group-');
    setIsGroupChat(isGroup);

    if (isGroup) {
      const group = groupChats.find((group) => group.id === id);
      setChatName(group ? group.name : 'Grupo Desconhecido');
      socket.emit('joinGroup', id);
    } else {
      const user = connectedUsers.find((user) => user.id === id);
      setChatName(user ? user.name : 'Usuário Desconhecido');
    }

    socket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('privateMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      if (isGroup) {
        socket.emit('leaveGroup', id);
      }
      socket.off('message');
      socket.off('privateMessage');
    };
  }, [id, connectedUsers]);

  // Enviar mensagem de texto
  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        sender: 'Eu',
        content: newMessage,
        createdAt: new Date().toISOString(),
      };

      if (isGroupChat) {
        socket.emit('sendMessage', { groupName: id, message: newMessage });
      } else {
        socket.emit('privateMessage', { toUserId: id, message: newMessage });
      }

      setMessages((prev) => [...prev, message]);
      setNewMessage('');
    }
  };

  // Enviar arquivo
  const sendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.type.startsWith('image') ? 'image' : 'document';

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result; // Base64 ou URL do arquivo
      const message: Message = {
        sender: 'Eu',
        content: fileType === 'image' ? (fileContent as string) : 'Arquivo enviado',
        createdAt: new Date().toISOString(),
        fileType,
        fileName: file.name,
      };

      if (isGroupChat) {
        socket.emit('sendMessage', { groupName: id, message: fileContent, fileType, fileName: file.name });
      } else {
        socket.emit('privateMessage', { toUserId: id, message: fileContent, fileType, fileName: file.name });
      }

      setMessages((prev) => [...prev, message]);
    };
    reader.readAsDataURL(file); // Converte para base64
  };

  // Renderizar a lista de mensagens
  const renderMessageContent = (msg: Message) => {
    if (msg.fileType === 'image') {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={msg.content} alt={msg.fileName} style={{ maxWidth: '200px', borderRadius: '8px' }} />;
    } else if (msg.fileType === 'document') {
      return (
        <a href={msg.content} download={msg.fileName} target="_blank" rel="noopener noreferrer">
          {msg.fileName || 'Documento'}
        </a>
      );
    } else {
      return <Text>{msg.content}</Text>;
    }
  };

  return (
    <Box p={4}>
      <VStack align="stretch" spacing={4}>
        <Text fontWeight="bold">Chat conectado com: {chatName || 'Carregando...'}</Text>
        <VStack align="stretch" spacing={2}>
          {messages.map((msg, index) => (
            <Box key={index}>
              <Text fontSize="sm" fontWeight="bold" color="gray.600">
                {msg.sender} - {new Date(msg.createdAt).toLocaleString()}
              </Text>
              <HStack
                alignSelf={msg.sender === 'Eu' ? 'flex-end' : 'flex-start'}
                bg={msg.sender === 'Eu' ? 'blue.100' : 'gray.100'}
                p={2}
                borderRadius="md"
              >
                {renderMessageContent(msg)}
              </HStack>
            </Box>
          ))}
        </VStack>
        <HStack>
          <Input
            placeholder="Escreva uma mensagem"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <Button colorScheme="blue" onClick={sendMessage}>
            Enviar
          </Button>
          <Button as="label" htmlFor="file-upload" leftIcon={<AttachmentIcon />} colorScheme="gray">
            Arquivo
          </Button>
          <Input
            type="file"
            id="file-upload"
            hidden
            onChange={sendFile}
          />
        </HStack>
      </VStack>
    </Box>
  );
}
