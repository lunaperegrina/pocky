import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../stores/authStore';

// Mock the API
jest.mock('../lib/api', () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

import api from '../lib/api';

describe('useAuthStore', () => {
  beforeEach(() => {
    // Clear store before each test
    useAuthStore.getState().logout();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Cleanup after each test
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockResponse = {
        data: {
          user: {
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
          },
        },
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      expect(result.current.user).toEqual({
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
      });
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle login errors', async () => {
      const mockError = new Error('Invalid credentials');
      mockError.name = 'AxiosError';
      Object.defineProperty(mockError, 'response', {
        value: { data: { error: 'Invalid credentials' } },
        configurable: true,
      });

      (api.post as jest.Mock).mockRejectedValue(mockError);

      const { result } = renderHook(() => useAuthStore());

      await expect(
        act(async () => {
          try {
            await result.current.login('invalid@example.com', 'wrongpassword');
          } catch (error) {
            expect(error.message).toBe('Invalid credentials');
          }
        })
      ).rejects.toThrow('Invalid credentials');

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('register', () => {
    it('should register successfully with valid data', async () => {
      const mockResponse = {
        data: {
          user: {
            id: '1',
            email: 'newuser@example.com',
            username: 'newuser',
          },
        },
      };

      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.register('newuser@example.com', 'password123', 'newuser');
      });

      expect(result.current.user).toEqual({
        id: '1',
        email: 'newuser@example.com',
        username: 'newuser',
      });
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle registration errors', async () => {
      const mockError = new Error('User already exists');
      mockError.name = 'AxiosError';
      Object.defineProperty(mockError, 'response', {
        value: { data: { error: 'User already exists' } },
        configurable: true,
      });

      (api.post as jest.Mock).mockRejectedValue(mockError);

      const { result } = renderHook(() => useAuthStore());

      await expect(
        act(async () => {
          try {
            await result.current.register('existing@example.com', 'password123', 'existinguser');
          } catch (error) {
            expect(error.message).toBe('User already exists');
          }
        })
      ).rejects.toThrow('User already exists');

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      // First login
      const mockLoginResponse = {
        data: {
          user: {
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
          },
        },
      };

      const mockLogoutResponse = { data: { message: 'Logout successful' } };

      (api.post as jest.Mock)
        .mockResolvedValueOnce(mockLoginResponse)
        .mockResolvedValueOnce(mockLogoutResponse);

      const { result } = renderHook(() => useAuthStore());

      // Login first
      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Then logout
      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});