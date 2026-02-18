import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../../state/chat';
import { useAuth } from '../../state/auth';
import { Layout } from '../../components/ui/Layout';
import { ChatThreadList } from '../../components/chat/ChatThreadList';
import { ChatWindow } from '../../components/chat/ChatWindow';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/FormControls';
export function ChatRoom() {
  const {
    threadId
  } = useParams<{
    threadId: string;
  }>();
  const {
    threads,
    currentThread,
    messages,
    fetchThreads,
    fetchMessages,
    sendMessage,
    isLoading
  } = useChat();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);
  useEffect(() => {
    if (threadId) {
      fetchMessages(threadId);
      // Poll for new messages every 3 seconds (mock realtime)
      const interval = setInterval(() => fetchMessages(threadId), 3000);
      return () => clearInterval(interval);
    }
  }, [threadId, fetchMessages]);
  if (!user) return null;
  const activeThread = threads.find((t) => t.id === threadId);
  return <Layout>
      <div className="h-[calc(100vh-200px)] min-h-[500px] bg-[#111827] border border-gray-800 rounded-xl overflow-hidden flex shadow-2xl">
        {/* Sidebar List - Hidden on Mobile when in room */}
        <div className="hidden md:block w-1/3 border-r border-gray-800 bg-[#0a0f1e]/50">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Messages</h2>
          </div>
          <ChatThreadList threads={threads} activeThreadId={threadId} currentUserId={user.id} onSelectThread={(id) => navigate(`/chat/${id}`)} />
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col w-full">
          {/* Mobile Back Button */}
          <div className="md:hidden p-2 border-b border-gray-800 flex items-center">
            <Button variant="ghost" size="sm" onClick={() => navigate('/chat')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </div>

          {activeThread ? <ChatWindow thread={activeThread} messages={messages} currentUserId={user.id} onSendMessage={(text) => sendMessage(threadId!, text)} /> : <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
            </div>}
        </div>
      </div>
    </Layout>;
}