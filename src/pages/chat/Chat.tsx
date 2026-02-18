import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../state/chat';
import { useAuth } from '../../state/auth';
import { Layout } from '../../components/ui/Layout';
import { ChatThreadList } from '../../components/chat/ChatThreadList';
import { MessageSquare } from 'lucide-react';
export function Chat() {
  const {
    threads,
    fetchThreads,
    isLoading
  } = useChat();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);
  if (!user) return null;
  return <Layout>
      <div className="h-[calc(100vh-200px)] min-h-[500px] bg-[#111827] border border-gray-800 rounded-xl overflow-hidden flex shadow-2xl">
        {/* Sidebar List */}
        <div className="w-full md:w-1/3 border-r border-gray-800 bg-[#0a0f1e]/50">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Messages</h2>
          </div>
          {isLoading ? <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
            </div> : <ChatThreadList threads={threads} currentUserId={user.id} onSelectThread={(id) => navigate(`/chat/${id}`)} />}
        </div>

        {/* Empty State for Desktop */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-[#111827]/50 text-gray-500 p-8 text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            Select a conversation
          </h3>
          <p>Choose a thread from the left to start chatting.</p>
        </div>
      </div>
    </Layout>;
}