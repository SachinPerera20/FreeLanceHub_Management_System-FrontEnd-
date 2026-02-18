import {
  User,
  SafeUser,
  AuthPayload,
  LoginInput,
  RegisterInput } from
'../types';
import {
  STORAGE_KEYS,
  readStore,
  writeStore,
  removeStore,
  generateId,
  nowISO } from
'../lib/storage';

function stripPassword(u: User): SafeUser {
  const { password: _, ...safe } = u;
  return safe;
}

function fakeToken(userId: string): string {
  return `mock-jwt-${userId}-${Date.now()}`;
}

export const authService = {
  async login(input: LoginInput): Promise<AuthPayload> {
    const users = readStore<User[]>(STORAGE_KEYS.USERS, []);
    const user = users.find((u) => u.email === input.email);
    if (!user) throw new Error('User not found');
    if (user.password !== input.password) throw new Error('Invalid password');
    const token = fakeToken(user.id);
    const safe = stripPassword(user);
    writeStore(STORAGE_KEYS.TOKEN, token);
    writeStore(STORAGE_KEYS.CURRENT_USER, safe);
    return { user: safe, token };
  },

  async register(input: RegisterInput): Promise<AuthPayload> {
    const users = readStore<User[]>(STORAGE_KEYS.USERS, []);
    if (users.find((u) => u.email === input.email)) {
      throw new Error('Email already registered');
    }
    const now = nowISO();
    const newUser: User = {
      id: generateId(),
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role,
      createdAt: now,
      updatedAt: now
    };
    users.push(newUser);
    writeStore(STORAGE_KEYS.USERS, users);
    const token = fakeToken(newUser.id);
    const safe = stripPassword(newUser);
    writeStore(STORAGE_KEYS.TOKEN, token);
    writeStore(STORAGE_KEYS.CURRENT_USER, safe);
    return { user: safe, token };
  },

  async logout(): Promise<void> {
    removeStore(STORAGE_KEYS.TOKEN);
    removeStore(STORAGE_KEYS.CURRENT_USER);
  },

  async getMe(): Promise<SafeUser | null> {
    return readStore<SafeUser | null>(STORAGE_KEYS.CURRENT_USER, null);
  },

  async getAllUsers(): Promise<SafeUser[]> {
    const users = readStore<User[]>(STORAGE_KEYS.USERS, []);
    return users.map(stripPassword);
  },

  async updateUserRole(userId: string, role: User['role']): Promise<SafeUser> {
    const users = readStore<User[]>(STORAGE_KEYS.USERS, []);
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error('User not found');
    users[idx].role = role;
    users[idx].updatedAt = nowISO();
    writeStore(STORAGE_KEYS.USERS, users);
    return stripPassword(users[idx]);
  },

  async deleteUser(userId: string): Promise<void> {
    let users = readStore<User[]>(STORAGE_KEYS.USERS, []);
    users = users.filter((u) => u.id !== userId);
    writeStore(STORAGE_KEYS.USERS, users);
  },

  async updateProfile(
  userId: string,
  data: {name?: string;bio?: string;})
  : Promise<SafeUser> {
    const users = readStore<User[]>(STORAGE_KEYS.USERS, []);
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error('User not found');
    if (data.name) users[idx].name = data.name;
    if (data.bio !== undefined) users[idx].bio = data.bio;
    users[idx].updatedAt = nowISO();
    writeStore(STORAGE_KEYS.USERS, users);
    const safe = stripPassword(users[idx]);
    writeStore(STORAGE_KEYS.CURRENT_USER, safe);
    return safe;
  }
};