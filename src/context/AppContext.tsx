import { createContext, useContext, useState, ReactNode } from 'react';
import { Comment, Complaint, mockComments, Post, mockPosts, Channel, mockChannels } from '@/data/mockData';

export type Page = 'home' | 'channels' | 'publications' | 'news' | 'about' | 'complaint' | 'moderation' | 'post' | 'channel';

interface User {
  id: string;
  phone: string;
  nickname: string;
  phoneVisible: boolean;
  role: 'user' | 'admin';
}

interface AppState {
  currentPage: Page;
  currentPostId: string | null;
  currentChannelId: string | null;
  user: User | null;
  posts: Post[];
  channels: Channel[];
  comments: Comment[];
  complaints: Complaint[];
  setPage: (page: Page, id?: string) => void;
  setUser: (user: User | null) => void;
  approvePost: (postId: string) => void;
  rejectPost: (postId: string) => void;
  addPost: (post: Omit<Post, 'id' | 'views' | 'commentsCount'>) => void;
  addComment: (comment: Omit<Comment, 'id' | 'approved'>) => void;
  approveComment: (commentId: string) => void;
  rejectComment: (commentId: string) => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => void;
  verifyChannel: (channelId: string, type: Channel['type']) => void;
  addChannel: (channel: Omit<Channel, 'id' | 'subscribersCount' | 'postsCount' | 'verified'>) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [currentChannelId, setCurrentChannelId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const setPage = (page: Page, id?: string) => {
    setCurrentPage(page);
    if (page === 'post') setCurrentPostId(id || null);
    if (page === 'channel') setCurrentChannelId(id || null);
  };

  const approvePost = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, status: 'approved' } : p));
  };

  const rejectPost = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, status: 'rejected' } : p));
  };

  const addPost = (post: Omit<Post, 'id' | 'views' | 'commentsCount'>) => {
    const newPost: Post = { ...post, id: Date.now().toString(), views: 0, commentsCount: 0 };
    setPosts(prev => [newPost, ...prev]);
  };

  const addComment = (comment: Omit<Comment, 'id' | 'approved'>) => {
    const newComment: Comment = { ...comment, id: Date.now().toString(), approved: false };
    setComments(prev => [...prev, newComment]);
  };

  const approveComment = (commentId: string) => {
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, approved: true } : c));
  };

  const rejectComment = (commentId: string) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  const addComplaint = (complaint: Omit<Complaint, 'id' | 'status' | 'createdAt'>) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setComplaints(prev => [...prev, newComplaint]);
  };

  const verifyChannel = (channelId: string, type: Channel['type']) => {
    setChannels(prev => prev.map(c => c.id === channelId ? { ...c, verified: true, type } : c));
  };

  const addChannel = (channel: Omit<Channel, 'id' | 'subscribersCount' | 'postsCount' | 'verified'>) => {
    const newChannel: Channel = { ...channel, id: Date.now().toString(), subscribersCount: 0, postsCount: 0, verified: false };
    setChannels(prev => [newChannel, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      currentPage, currentPostId, currentChannelId, user, posts, channels, comments, complaints,
      setPage, setUser, approvePost, rejectPost, addPost, addComment,
      approveComment, rejectComment, addComplaint, verifyChannel, addChannel,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
