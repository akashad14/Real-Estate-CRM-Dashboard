import React from 'react';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import Layout from '../components/layout/Layout';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const stats = [
  {
    label: 'Total Leads',
    value: '78,250',
    change: '+70.5%',
    trend: 'up',
    icon: <ArrowUpward sx={{ color: '#4caf50' }} />,
    progress: 70,
  },
  {
    label: 'Total Properties',
    value: '18,800',
    change: '-27.4%',
    trend: 'down',
    icon: <ArrowDownward sx={{ color: '#f44336' }} />,
    progress: 40,
  },
  {
    label: 'Total Sales',
    value: '$35,078',
    change: '-27.4%',
    trend: 'down',
    icon: <ArrowDownward sx={{ color: '#f44336' }} />,
    progress: 60,
  },
  {
    label: 'Total Marketing',
    value: '$1,12,083',
    change: '+70.5%',
    trend: 'up',
    icon: <ArrowUpward sx={{ color: '#4caf50' }} />,
    progress: 80,
  },
];

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          Real Estate CRM Overview
        </Typography>
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: 3,
                  bgcolor: '#f8f9fa',
                }}
              >
                <Typography variant="subtitle1" sx={{ color: '#495057', mb: 1 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#212529' }}>
                  {stat.value}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 1,
                  }}
                >
                  {stat.icon}
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 1,
                      color: stat.trend === 'up' ? '#4caf50' : '#f44336',
                    }}
                  >
                    {stat.change}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stat.progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    mt: 2,
                    bgcolor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      backgroundColor: stat.trend === 'up' ? '#4caf50' : '#f44336',
                    },
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default DashboardPage;