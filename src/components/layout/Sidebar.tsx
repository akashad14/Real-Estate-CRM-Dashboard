import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material';
import { Home, Users, Building } from "lucide-react"

import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: '#f8f9fa', // Light gray background
        boxShadow: 1,
        p: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left', pl: 2 }}>
        Real Estate CRM
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List>
        {/* Dashboard */}
        <ListItem
          component={Link}
          to="/dashboard"
          sx={{
            borderRadius: 1,
            color: 'black',
            '&:hover': { bgcolor: '#e9ecef' },
            mb: 1,
          }}
        >
          <ListItemIcon>
            <Home/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Leads */}
        <ListItem
          component={Link}
          to="/leads"
          sx={{
            borderRadius: 1,
            color: 'black',
            '&:hover': { bgcolor: '#e9ecef' },
            mb: 1,
          }}
        >
          <ListItemIcon>
            <Users />
          </ListItemIcon>
          <ListItemText primary="Leads" />
        </ListItem>

        {/* Properties */}
        <ListItem
          component={Link}
          to="/properties"
          sx={{
            borderRadius: 1,
            color: 'black',
            '&:hover': { bgcolor: '#e9ecef' },
          }}
        >
          <ListItemIcon>
            <Building  />
          </ListItemIcon>
          <ListItemText primary="Properties" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
