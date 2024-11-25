"use client"

import useToasts from '@/hooks/useToasts';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
    transports: ['websocket'], // Force to use WebSocket
    withCredentials: true, // Para enviar cookies do lado do servidor
  });

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('Funcionários');
  const [privateMessage, setPrivateMessage] = useState<string>('');
  const [privateRecipient, setPrivateRecipient] = useState<string>('');
  const {showToast} = useToasts()

  useEffect(() => {
    // Receber mensagens do grupo
    socket.on('message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, `Grupo: ${msg}`]);
    });

    // Receber mensagens privadas
    socket.on('privateMessage', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, `Privado: ${msg}`]);
    });

    return () => {
      socket.off('message');
      socket.off('privateMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { groupName, message });
      setMessage('');
      
      showToast('Sua mensagem foi enviada para o grupo.', 'success');
    } else {
      showToast('Digite uma mensagem para enviar.', 'error');
    }
  };

  const sendPrivateMessage = () => {
    if (privateMessage.trim() && privateRecipient.trim()) {
      socket.emit('privateMessage', { toSocketId: privateRecipient, message: privateMessage });
      setPrivateMessage('');
      setPrivateRecipient('');
      
      showToast('Sua mensagem privada foi enviada.', 'success');
    } else {
      showToast('Preencha todos os campos para enviar a mensagem privada.', 'error');
    }
  };

  const joinGroup = () => {
    socket.emit('joinGroup', groupName);
    showToast(`Você entrou no grupo ${groupName}.`, 'success');
  };

  const leaveGroup = () => {
    socket.emit('leaveGroup', groupName);
    showToast(`Você saiu do grupo ${groupName}.`, 'success');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-4">Chat</h2>

      <div className="flex justify-center gap-4 mb-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Grupo: {groupName}</span>
          </label>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={joinGroup}>Entrar no Grupo</button>
            <button className="btn bg-red-500 text-white" onClick={leaveGroup}>Sair do Grupo</button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Mensagens</h3>
        <div className="border p-4 rounded-lg h-80 overflow-y-auto bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 mb-2 rounded bg-white shadow-sm">{msg}</div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          className="input input-bordered w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem para o grupo"
        />
        <button className="btn btn-primary" onClick={sendMessage}>Enviar para o grupo</button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Mensagem Privada</h3>
        <div className="flex gap-4">
          <input
            type="text"
            className="input input-bordered w-1/4"
            value={privateRecipient}
            onChange={(e) => setPrivateRecipient(e.target.value)}
            placeholder="ID do destinatário"
          />
          <input
            type="text"
            className="input input-bordered w-full"
            value={privateMessage}
            onChange={(e) => setPrivateMessage(e.target.value)}
            placeholder="Digite sua mensagem privada"
          />
          <button className="btn btn-primary" onClick={sendPrivateMessage}>Enviar Mensagem Privada</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
