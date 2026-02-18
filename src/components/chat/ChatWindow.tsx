import React, { useEffect, useState, useRef } from 'react';
import { Message, ChatThread, SafeUser } from '../../types';
import { Button, Input } from '../ui/FormControls';
import { Send, User, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { usersService } from '../../services/users.service';
import { contractsService } from '../../services/contracts.service';
interface ChatWindowProps {
  thread: ChatThread;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (text: string) => void;
}
export function ChatWindow({
  thread,
  messages,
  currentUserId,
  onSendMessage
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState<SafeUser | null>(null);
  const [chatError, setChatError] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    const fetchOtherUser = async () => {
      const otherId =
      thread.clientId === currentUserId ?
      thread.freelancerId :
      thread.clientId;
      const user = await usersService.getUserById(otherId);
      setOtherUser(user);
    };
    fetchOtherUser();
  }, [thread, currentUserId]);
  useEffect(() => {
    const checkPayment = async () => {
      const contracts = await contractsService.listContracts();
      const contract = contracts.find(
        (c) =>
        c.jobId === thread.jobId &&
        c.clientId === thread.clientId &&
        c.freelancerId === thread.freelancerId
      );
      if (contract && contract.paymentStatus === 'paid') {
        setPaymentCompleted(true);
      } else {
        setPaymentCompleted(false);
      }
    };
    checkPayment();
  }, [thread]);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i;
    const phoneRegex = /(\+?\d[\d\s\-()]{7,15})/;
    if (emailRegex.test(newMessage) || phoneRegex.test(newMessage)) {
      setChatError('Sharing contact information is not allowed.');
      setTimeout(() => setChatError(null), 5000);
      return;
    }
    onSendMessage(newMessage);
    setNewMessage('');
    setChatError(null);
  };
  const displayName = otherUser ?
  otherUser.name :
  `User ${thread.clientId === currentUserId ? thread.freelancerId.slice(0, 8) : thread.clientId.slice(0, 8)}`;
  return (
    <div className="flex flex-col h-full bg-[#111827]/50 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3 bg-[#111827]">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">{displayName}</h3>
          {otherUser &&
          <div className="text-xs text-gray-500 capitalize">
              {otherUser.role}{' '}
              {otherUser.averageRating ? `• ⭐ ${otherUser.averageRating}` : ''}
            </div>
          }
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">

        {messages.length === 0 ?
        <div className="text-center text-gray-500 mt-10">
            Start the conversation...
          </div> :

        messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>

                <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMe ? 'bg-teal-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-100 rounded-bl-none'}`}>

                  <p className="text-sm">{msg.text}</p>
                  <p
                  className={`text-[10px] mt-1 text-right ${isMe ? 'text-teal-200' : 'text-gray-400'}`}>

                    {format(new Date(msg.createdAt), 'h:mm a')}
                  </p>
                </div>
              </div>);

        })
        }
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 bg-[#111827]">
        {chatError &&
        <div className="mb-2 flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-2 rounded-lg border border-red-500/20">
            <AlertCircle className="w-4 h-4" />
            {chatError}
          </div>
        }
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              if (chatError) setChatError(null);
            }}
            placeholder="Type a message..."
            className="flex-1" />

          <Button type="submit" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>);

}