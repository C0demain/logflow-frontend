import io, { Socket } from 'socket.io-client';

const getCookie = (name: string): string | undefined => {
    if (typeof document === 'undefined') {
      return undefined; // Garante que a função não falhe no ambiente do servidor
    }
  
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : undefined;
};
  
const token = getCookie('token');

// Configura o WebSocket com o token JWT no handshake
export const socket: Socket = io('http://localhost:8000', {
  auth: {
    token, // Inclui o token JWT no handshake
  },
  reconnection: true, // Habilita reconexões automáticas
  reconnectionAttempts: 5, // Número de tentativas de reconexão
  timeout: 5000, // Tempo limite para estabelecer conexão
});
