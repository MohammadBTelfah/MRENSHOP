import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';

import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import axios from 'axios';

const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: React.createElement(DashboardIcon) },
  { segment: 'orders', title: 'Orders', icon: React.createElement(ShoppingCartIcon) },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  const navigate = useNavigate();
  const [role, setRole] = useState({});

  useEffect(() => {
    axios.get('http://127.0.1:5000/api/users/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setRole(response.data.role || 'User');
      })
      .catch(error => {
        console.error('Error fetching user role:', error);
        setRole('user'); 
      });

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return React.createElement(
    Box,
    {
      sx: {
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
    },
    React.createElement(Typography, { variant: 'h6', gutterBottom: true }, 'Welcome to the Dashboard'),
    React.createElement(
      Typography,
      { variant: 'body1', gutterBottom: true },
      'You are logged in as: ',
      React.createElement('strong', null,
        role === 'admin' ? 'Admin' :
        role === 'user' ? 'User' :
        ''
      )
    ),
    React.createElement(
      'button',
      {
        onClick: handleLogout,
        style: {
          marginTop: 20,
          padding: '6px 12px',
          cursor: 'pointer',
          background: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        },
      },
      'Logout'
    )
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function ToolbarActionsSearch() {
  return React.createElement(
    Stack,
    { direction: 'row' },
    React.createElement(
      Tooltip,
      { title: 'Search', enterDelay: 1000 },
      React.createElement(
        'div',
        null,
        React.createElement(
          IconButton,
          {
            type: 'button',
            'aria-label': 'search',
            sx: { display: { xs: 'inline', md: 'none' } },
          },
          React.createElement(SearchIcon)
        )
      )
    ),
    React.createElement(TextField, {
      label: 'Search',
      variant: 'outlined',
      size: 'small',
      slotProps: {
        input: {
          endAdornment: React.createElement(
            IconButton,
            { type: 'button', 'aria-label': 'search', size: 'small' },
            React.createElement(SearchIcon)
          ),
          sx: { pr: 0.5 },
        },
      },
      sx: { display: { xs: 'none', md: 'inline-block' }, mr: 1 },
    }),
    React.createElement(ThemeSwitcher)
  );
}

function SidebarFooter({ mini }) {
  return React.createElement(
    Typography,
    {
      variant: 'caption',
      sx: { m: 1, whiteSpace: 'nowrap', overflow: 'hidden' },
    },
    mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by MUI`
  );
}

SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function CustomAppTitle() {
  return React.createElement(
    Stack,
    { direction: 'row', alignItems: 'center', spacing: 2 },
    React.createElement(CloudCircleIcon, { fontSize: 'large', color: 'primary' }),
    React.createElement(Typography, { variant: 'h6' }, 'My App'),
    React.createElement(Chip, { size: 'small', label: 'BETA', color: 'info' }),
    React.createElement(
      Tooltip,
      { title: 'Connected to production' },
      React.createElement(CheckCircleIcon, { color: 'success', fontSize: 'small' })
    )
  );
}

function DashboardLayoutSlots(props) {
  const { window } = props;
  const navigate = useNavigate();
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return React.createElement(
    DemoProvider,
    { window: demoWindow },
    React.createElement(
      AppProvider,
      {
        navigation: NAVIGATION,
        router: router,
        theme: demoTheme,
        window: demoWindow,
      },
      React.createElement(
        DashboardLayout,
        {
          slots: {
            appTitle: CustomAppTitle,
            toolbarActions: ToolbarActionsSearch,
            sidebarFooter: SidebarFooter,
          },
        },
        React.createElement(DemoPageContent, { pathname: router.pathname })
      )
    )
  );
}

DashboardLayoutSlots.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutSlots;
