'use client';

import { create } from 'zustand';
import { User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, isLoading: false });
    } catch (error: any) {
      let errorMessage = 'ログインに失敗しました。';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'ユーザーが見つかりません。';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'パスワードが間違っています。';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'メールアドレスの形式が正しくありません。';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'このアカウントは無効になっています。';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'リクエストが多すぎます。しばらく時間をおいて再試行してください。';
      }
      
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await signOut(auth);
      set({ user: null, isLoading: false });
    } catch (error: any) {
      set({ error: 'ログアウトに失敗しました。', isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setUser: (user: User | null) => set({ user, isLoading: false }),
}));

// Firebase認証状態の監視をセットアップ
let authListenerInitialized = false;

export const initializeAuthListener = () => {
  if (authListenerInitialized) return;
  
  authListenerInitialized = true;
  
  onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
  });
};

// ブラウザ環境でのみ認証リスナーを初期化
if (typeof window !== 'undefined') {
  initializeAuthListener();
} 