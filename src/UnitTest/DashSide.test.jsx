import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom'; // Add this import to include Jest DOM matchers
import Dashside from '../Dashboard/Components/DashSide'; // adjust path if needed
import { AuthContext } from '../Context/AuthContext'; // adjust path if needed
import MenuContext from '../Context/MenuContext'; // adjust path if needed
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router

// Helper function to render with all contexts
const renderWithContexts = (ui, authValue) => {
  return render(
    <Router> {/* Wrap in Router */}
      <MenuContext>
        <AuthContext.Provider value={authValue}>
          {ui}
        </AuthContext.Provider>
      </MenuContext>
    </Router>
  );
};

describe('Dashside role-based buttons visibility', () => {
  test('does not show super admin controls for a city admin', () => {
    const mockAuth = {
      isAuthenticated: true,
      user: {
        level: ['ROLE_CITYADMIN'],
      },
      authChecked: true,
      setUser: vi.fn(),
      setIsAuthenticated: vi.fn(),
    };

    // Render the Dashside component wrapped in Router, AuthContext, and MenuContext with mockAuth
    renderWithContexts(<Dashside />, mockAuth);

    // Assertions for city admin (should not see super admin controls)
    expect(screen.queryByText('احصائيات المحافظه')).not.toBeInTheDocument();
    expect(screen.queryByText('اضافة مشرف')).not.toBeInTheDocument();
    expect(screen.queryByText('مشرفين المدن')).not.toBeInTheDocument();
    expect(screen.queryByText('مشرفين المحافظات')).not.toBeInTheDocument();
  });

  test('does not show admin creation controls for governorate admin', () => {
    const mockAuth = {
      isAuthenticated: true,
      user: {
        level: ['ROLE_GOVERNORATEADMIN'],
      },
      authChecked: true,
      setUser: vi.fn(),
      setIsAuthenticated: vi.fn(),
    };

    // Render the Dashside component wrapped in Router, AuthContext, and MenuContext with mockAuth
    renderWithContexts(<Dashside />, mockAuth);

    // Assertions for governorate admin (should see governorate stats but not admin creation)
    expect(screen.getByText('احصائيات المحافظه')).toBeInTheDocument();
    expect(screen.queryByText('اضافة مشرف')).not.toBeInTheDocument();
  });

  test('shows Master admin controls for a master admin', () => {
    const mockAuth = {
      isAuthenticated: true,
      user: {
        level: ['ROLE_CITYADMIN', 'ROLE_GOVERNORATEADMIN', 'ROLE_MASTERADMIN'],
      },
      authChecked: true,
      setUser: vi.fn(),
      setIsAuthenticated: vi.fn(),
    };

    // Render the Dashside component wrapped in Router, AuthContext, and MenuContext with mockAuth
    renderWithContexts(<Dashside />, mockAuth);

    // Assertions for master admin (should see super admin controls)
    expect(screen.getByText('احصائيات المحافظه')).toBeInTheDocument();
    expect(screen.getByText('اضافة مشرف')).toBeInTheDocument();
  });
});