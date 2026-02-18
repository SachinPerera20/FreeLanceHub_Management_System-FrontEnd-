import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Cards';
import { Button, Input, Select } from '../../components/ui/FormControls';
import { RoleBadge } from '../../components/ui/Badges';
import { useAuth } from '../../state/auth';
import { Search, Trash2, Shield } from 'lucide-react';
import type { SafeUser, UserRole } from '../../types';
export function Users() {
  const {
    getAllUsers,
    updateUserRole,
    deleteUser,
    user: currentUser
  } = useAuth();
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const loadUsers = async () => {
    setLoading(true);
    const data = await getAllUsers();
    setUsers(data);
    setLoading(false);
  };
  useEffect(() => {
    loadUsers();
  }, []);
  const handleRoleChange = async (userId: string, role: UserRole) => {
    await updateUserRole(userId, role);
    await loadUsers();
  };
  const handleDelete = async (userId: string) => {
    if (userId === currentUser?.id) return;
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
      await loadUsers();
    }
  };
  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  return <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">User Management</h1>

      <div className="bg-[#111827]/50 border border-gray-800 p-4 rounded-xl mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input placeholder="Search users by name or email..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div> : <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Name
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Email
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Role
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Change Role
                  </th>
                  <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => <tr key={u.id} className="border-b border-gray-800/50 hover:bg-[#1f2937]/30 transition-colors">
                    <td className="p-4 text-white font-medium">{u.name}</td>
                    <td className="p-4 text-gray-400 text-sm">{u.email}</td>
                    <td className="p-4">
                      <RoleBadge role={u.role} />
                    </td>
                    <td className="p-4">
                      <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)} className="bg-[#111827] border border-gray-700 text-gray-100 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500" disabled={u.id === currentUser?.id}>
                        <option value="client">Client</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="danger" size="sm" onClick={() => handleDelete(u.id)} disabled={u.id === currentUser?.id}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-8 text-gray-500">
              No users found.
            </div>}
        </Card>}
    </Layout>;
}