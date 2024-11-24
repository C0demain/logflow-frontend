'use client';

import { useState, useEffect } from 'react';
import { Box, Heading, VStack, Divider, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { socket } from '@/app/util/socket';

// Tipos de usuários conectados
interface ConnectedUser {
  id: string;
  name: string;
}

// Chats em grupo pré-fixados
const groupChats = [
  { id: 'group-1', name: 'Friends Group' },
  { id: 'group-2', name: 'Work Group' },
];

export default function ChatsOptions() {
  const router = useRouter();
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    // Obter o ID do usuário atual do socket
    socket.emit('getUserInfo'); // Solicita as informações do usuário atual
    socket.on('userInfo', (userInfo: { id: string }) => {
      setCurrentUser(userInfo.id);
    });

    // Obter usuários conectados
    socket.emit('getConnectedUsers');
    socket.on('connectedUsers', (users: ConnectedUser[]) => {
      setConnectedUsers(users);
    });

    return () => {
      socket.off('connectedUsers');
      socket.off('userInfo');
    };
  }, []);

  const handleChatClick = (id: string) => {
    router.push(`/auth/chat/${id}`);
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Chats</Heading>
      <VStack align="stretch" spacing={4}>
        {/* Chats em Grupo */}
        <Heading size="md">Group Chats</Heading>
        <VStack align="stretch" spacing={2}>
          {groupChats.map((group) => (
            <Box
              key={group.id}
              onClick={() => handleChatClick(group.id)}
              cursor="pointer"
              p={2}
              bg="blue.100"
              borderRadius="md"
            >
              {group.name}
            </Box>
          ))}
        </VStack>
        <Divider />

        {/* Usuários Conectados */}
        <Heading size="md">Connected Users</Heading>
        <VStack align="stretch" spacing={2}>
          {connectedUsers
            .filter((user) => user.id !== currentUser)
            .map((user) => (
              <Box
                key={user.id}
                onClick={() => handleChatClick(user.id)}
                cursor="pointer"
                p={2}
                bg="gray.100"
                borderRadius="md"
              >
                {user.name}
              </Box>
            ))}
        </VStack>
      </VStack>
    </Box>
  );
}
