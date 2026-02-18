import React, { useEffect, useState } from 'react';
import { ChatThread, SafeUser } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { User } from 'lucide-react';
import { usersService } from '../../services/users.service';
interface ChatThreadListProps {
  threads: ChatThread[];
  activeThreadId?: string;
  currentUserId: string;
  onSelectThread: (threadId: string) => void;
}
export function ChatThreadList({
  threads,
  activeThreadId,
  currentUserId,
  onSelectThread
}: ChatThreadListProps) {
  const [usersMap, setUsersMap] = useState<Record<string, SafeUser>>({});
  useEffect(() => {
    const fetchUsers = async () => {
      const uniqueUserIds = new Set<string>();
      threads.forEach((t) => {
        const otherId = t.clientId === currentUserId ? t.freelancerId : t.clientId;
        uniqueUserIds.add(otherId);
      });
      const newUsersMap: Record<string, SafeUser> = {
        ...usersMap
      };
      let hasUpdates = false;
      for (const uid of Array.from(uniqueUserIds)) {
        if (!newUsersMap[uid]) {
          const u = await usersService.getUserById(uid);
          if (u) {
            newUsersMap[uid] = u;
            hasUpdates = true;
          }
        }
      }
      if (hasUpdates) {
        setUsersMap(newUsersMap);
      }
    };
    fetchUsers();
  }, [threads, currentUserId]);
  return <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      {threads.length === 0 ? <div className="p-4 text-center text-gray-500 text-sm">
          No conversations yet.
        </div> : threads.map((thread) => {
      const isClient = currentUserId === thread.clientId;
      const otherUserId = isClient ? thread.freelancerId : thread.clientId;
      const otherUser = usersMap[otherUserId];
      const displayName = otherUser ? otherUser.name : `User ${otherUserId.slice(0, 5)}...`;
      return <button key={thread.id} onClick={() => onSelectThread(thread.id)} className={`flex items-center p-4 border-b border-gray-800 transition-colors text-left ${activeThreadId === thread.id ? 'bg-teal-900/20 border-l-4 border-l-teal-500' : 'hover:bg-[#1f2937]/50 border-l-4 border-l-transparent'}`}>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mr-3 overflow-hidden">
                {/* Avatar logic could go here if user has avatarUrl */}
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-medium text-white truncate">
                    {displayName}
                  </span>
                  {thread.lastMessageAt && <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {formatDistanceToNow(new Date(thread.lastMessageAt), {
                addSuffix: false
              })}
                    </span>}
                </div>
                {otherUser && <div className="text-xs text-gray-500 mb-1 capitalize">
                    {otherUser.role}
                  </div>}
                <p className="text-sm text-gray-400 truncate">
                  View conversation
                </p>
              </div>
            </button>;
    })}
    </div>;
}