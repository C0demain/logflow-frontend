'use client';

import ChatList, { Chat } from '@/components/ChatBox/ChatList';
import { Box, Heading, VStack, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const groups: Chat[] = [
  { id: 'group-1', name: 'Friends Group' },
  { id: 'group-2', name: 'Work Group' },
];

const privateChats: Chat[] = [
  { id: 'user-1', name: 'John Doe' },
  { id: 'user-2', name: 'Jane Smith' },
];

export default function HomePage() {
  const router = useRouter();

  const handleChatClick = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Chats</Heading>
      <VStack align="stretch" spacing={4}>
        <ChatList title="Groups" chats={groups} onChatClick={handleChatClick} />
        <Divider />
        <ChatList title="Private" chats={privateChats} onChatClick={handleChatClick} />
      </VStack>
    </Box>
  );
}
