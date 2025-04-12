import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from '../Website/Login';
import axios from 'axios';
import '@testing-library/jest-dom';
import { vi , describe , test } from 'vitest';

vi.mock('axios');
vi.mock('react-router-dom', () => ({
Link: ({ children }) => <span>{children}</span>,
}));

describe('Login Component', () => {
    beforeEach(() => {
        render(<Login />);
    });

    test('shows error if email or password is missing', async () => {
        const loginButton = screen.getByTestId('login-button');
        fireEvent.click(loginButton);

        await waitFor(() => {
        expect(screen.getByText('البريد الإلكتروني مطلوب')).toBeInTheDocument();
        expect(screen.getByText('كلمة المرور مطلوبة')).toBeInTheDocument();
        });
    });

    test('shows error message when email/password are incorrect', async () => {
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const loginButton = screen.getByTestId('login-button');

        const fakeUsers = [
        { username: 'admin@example.com', password: 'admin123' },
        ];

        axios.post.mockImplementation(async (_url, credentials) => {
        const userExists = fakeUsers.find(
            (user) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );
        if (!userExists) {
            const error = new Error('Unauthorized');
            error.response = { status: 401 };
            throw error;
        }
        return { data: { jwttoken: 'fake-token' }, status: 200 };
        });

        fireEvent.change(emailInput, {
        target: { value: 'wrong@example.com' },
        });
        fireEvent.change(passwordInput, {
        target: { value: 'wrongpass' },
        });

        fireEvent.click(loginButton);

        await waitFor(() => {
        expect(
            screen.getByText('خطأ في البريد الإلكتروني أو كلمة المرور')
        ).toBeInTheDocument();
        });
    });

    test('sends login request and checks HTTP status', async () => {
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const loginButton = screen.getByTestId('login-button');

        axios.post.mockResolvedValue({
        data: {
            jwttoken: 'fake-jwt-token',
        },
        status: 200,
        });

        fireEvent.change(emailInput, {
        target: { value: 'test@example.com' },
        });
        fireEvent.change(passwordInput, {
        target: { value: 'ValidPass123!' },
        });

        fireEvent.click(loginButton);

        await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
            expect.stringContaining('/login'),
            {
            username: 'test@example.com',
            password: 'ValidPass123!',
            }
        );
        });
    });
});
