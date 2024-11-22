import { Box, VStack, Text } from '@chakra-ui/react';

export interface Chat {
    id: string;
    name: string;
}

export interface Message {
    sender: string;
    content: string;
}

interface ChatListProps {
    title: string;
    chats: Chat[];
    onChatClick: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ title, chats, onChatClick }) => {
    return (
        <VStack align="stretch" spacing={2}>
            <Text fontWeight="bold">{title}</Text>
            {chats.map((chat) => (
                <Box
                    key={chat.id}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                    onClick={() => onChatClick(chat.id)}
                >
                    {chat.name}
                </Box>
            ))}
        </VStack>
    );
};

export default ChatList;
