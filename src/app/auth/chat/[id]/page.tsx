'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, VStack, HStack, Text, Input, Button, IconButton } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { socket } from '@/app/util/socket';

interface Message {
  sender: string;
  content: string;
  createdAt: string;
  fileType?: string;
  fileName?: string;
}

interface ConnectedUser {
  id: string;
  name: string;
}

const groupChats = [
  { id: 'group-1', name: 'Central de Comunicação' },
  { id: 'group-2', name: 'Gestão e Resultados' },
];

export default function ChatPage() {
  const { id } = useParams() as { id: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isGroupChat, setIsGroupChat] = useState<boolean>(false);
  const [chatName, setChatName] = useState<string>('');
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);

  // Função para tocar som de notificação
  const playNotificationSound = () => {
    try {
      const notificationSound = new Audio('/sounds/notification-wpp.mp3');
      notificationSound.volume = 0.5;
      notificationSound.play();
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  };

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

    // Listener para mensagens de grupo
    socket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
      playNotificationSound();
    });

    // Listener para mensagens privadas
    socket.on('privateMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
      playNotificationSound();
    });

    return () => {
      if (isGroup) {
        socket.emit('leaveGroup', id);
      }
      socket.off('message');
      socket.off('privateMessage');
    };
  }, [id, connectedUsers]);

  // Função para enviar mensagens de texto
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

  // Função para enviar arquivos
  const sendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.type;
    const fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;

      const message: Message = {
        sender: 'Eu',
        content: 'Arquivo enviado',
        createdAt: new Date().toISOString(),
        fileType,
        fileName,
      };

      if (isGroupChat) {
        socket.emit('sendMessage', { groupName: id, file: fileContent, fileType, fileName });
      } else {
        socket.emit('privateMessage', { toUserId: id, file: fileContent, fileType, fileName });
      }

      setMessages((prev) => [...prev, message]);
    };
    reader.readAsArrayBuffer(file);
  };

  // Renderizar o conteúdo da mensagem
  const renderMessageContent = (msg: Message) => {
    if (msg.fileType?.startsWith('image')) {
      return (
        <img
          src={`data:${msg.fileType};base64,${msg.content}`}
          alt={msg.fileName}
          style={{ maxWidth: '200px', borderRadius: '8px' }}
        />
      );
    } else if (msg.fileType) {
      return (
        <a
          href={`data:${msg.fileType};base64,${msg.content}`}
          download={msg.fileName}
          target="_blank"
          rel="noopener noreferrer"
        >
          {msg.fileName || 'Arquivo'}
        </a>
      );
    } else {
      return <Text className='text-2xl'>{msg.content}</Text>;
    }
  };

  return (
    <Box p={4}>
      <VStack align="stretch" spacing={4}>
        <Text fontWeight="bold">Chat: {chatName || 'Carregando...'}</Text>
        <VStack align="stretch" spacing={2}>
          {messages.map((msg, index) => (
            <Box key={index} className='flex flex-col'>
              <div
                data-owner={msg.sender === 'Eu'}
                className=' flex flex-col py-2 px-4 rounded-md data-[owner=true]:bg-blue-400 data-[owner=true]:items-end data-[owner=false]:bg-slate-100 data-[owner=false]:items-start w-8/12 data-[owner=true]:self-end data-[owner=false]:self-start'
              >
                {isGroupChat && <p className='text-md font-medium'>{msg.sender}</p>}
                {renderMessageContent(msg)}
                <p data-owner={msg.sender === 'Eu'} className='text-2'>{new Date(msg.createdAt).toLocaleString()}</p>
              </div>
            </Box>
          ))}
        </VStack>
        <HStack>
          <Input
            placeholder="Escreva uma mensagem"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <Button colorScheme="blue" onClick={sendMessage}>
            Enviar
          </Button>
          <Button as="label" htmlFor="file-upload" leftIcon={<AttachmentIcon />} colorScheme="gray">
            Arquivo
          </Button>
          <Input type="file" id="file-upload" hidden onChange={sendFile} />
        </HStack>
      </VStack>
    </Box>
  );
}
