import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from '../Website/Login';
import '@testing-library/jest-dom';
import { vi, describe, test } from 'vitest';
import { Axios } from '../API/Axios';

// Mock the correct Axios import
vi.mock('../API/Axios', () => ({
  Axios: {
    post: vi.fn()
  }
}));

vi.mock('react-router-dom', () => ({
  Link: ({ children }) => <span>{children}</span>,
  useNavigate: () => vi.fn(),
}));

describe('Login Component', () => {
  // Move render to each test instead of beforeEach
  
  test('displays validation errors when fields are empty', async () => {
    render(<Login />); // Render inside the test
    
    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    // Separate waitFor calls to avoid ESLint multiple assertions warning
    await waitFor(() => {
      expect(screen.getByText('البريد الإلكتروني مطلوب')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('كلمة المرور مطلوبة')).toBeInTheDocument();
    });
  });

  test('displays error on failed login', async () => {
    render(<Login />); // Render inside the test
    
    Axios.post.mockRejectedValueOnce({
      response: { status: 401 },
    });

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(
        screen.getByText('خطأ في البريد الإلكتروني أو كلمة المرور')
      ).toBeInTheDocument();
    });
  });

  test('sends login request when form is valid', async () => {
    render(<Login />); // Render inside the test
    
    Axios.post.mockResolvedValueOnce({
      data: { 
        jwttoken: 'mocked-token',
        user: {
          level: ['ROLE_CITYADMIN', 'ROLE_GOVERNORATEADMIN', 'ROLE_MASTERADMIN'],
        }
      },
    });

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(Axios.post).toHaveBeenCalledWith(
        '/login',
        {
          username: 'user@example.com',
          password: 'password123',
        }
      );
    });
  });

  test('should not allow login with ROLE_CITIZEN and should show error message', async () => {
    render(<Login />);
    
    // Setup mock to return ROLE_CITIZEN
    Axios.post.mockResolvedValueOnce({
      data: { 
        jwttoken: 'citizen-token',
        user: {
          level: ['ROLE_CITIZEN'],
        }
      },
    });

    // Fill in form fields
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'citizen@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });

    // Submit form
    fireEvent.click(screen.getByTestId('login-button'));

    // This test should fail because our website currently allows ROLE_CITIZEN to login
    // but the requirement is that it should not allow it
    await waitFor(() => {
      // We expect an error message to be displayed, but it won't be since the app isn't properly rejecting this role
      expect(
        screen.getByText('خطأ في البريد الإلكتروني أو كلمة المرور')
      ).toBeInTheDocument();
    });
  });

  test('should not allow login with ROLE_EMPLOYEE and should show error message', async () => {
    render(<Login />);
    
    // Setup mock to return ROLE_EMPLOYEE
    Axios.post.mockResolvedValueOnce({
      data: { 
        jwttoken: 'employee-token',
        user: {
          level: ['ROLE_EMPLOYEE'],
        }
      },
    });

    // Fill in form fields
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'employee@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });

    // Submit form
    fireEvent.click(screen.getByTestId('login-button'));

    // This test should fail because our website currently allows ROLE_EMPLOYEE to login
    // but the requirement is that it should not allow it
    await waitFor(() => {
      // We expect an error message to be displayed, but it won't be since the app isn't properly rejecting this role
      expect(
        screen.getByText('خطأ في البريد الإلكتروني أو كلمة المرور')
      ).toBeInTheDocument();
    });
  });
});