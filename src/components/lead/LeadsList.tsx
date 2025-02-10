// src/components/Leads/LeadsList.tsx
import React, { useState } from 'react';
import { 
  Box, TextField, List, ListItem, ListItemText, Pagination, IconButton, Button, Stack 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const LeadsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const leadsPerPage = 5;

  const leads = [
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210' },
    { id: 3, name: 'Alice Johnson', phone: '555-555-5555' },
    { id: 4, name: 'Bob Brown', phone: '111-222-3333' },
    { id: 5, name: 'Charlie Davis', phone: '444-444-4444' },
    { id: 6, name: 'Eve White', phone: '666-666-6666' },
  ];

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
  );

  const paginatedLeads = filteredLeads.slice(
    (page - 1) * leadsPerPage,
    page * leadsPerPage
  );

  const handleEdit = (id: number) => {
    console.log(`Editing lead with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting lead with ID: ${id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="Search by Name or Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <List>
        {paginatedLeads.map((lead) => (
          <ListItem key={lead.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
            <ListItemText primary={lead.name} secondary={lead.phone} />
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button variant="contained" color="primary" startIcon={<Edit />} onClick={() => handleEdit(lead.id)}>
                Edit Details
              </Button>
              <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => handleDelete(lead.id)}>
                Delete
              </Button>
            </Stack>
          </ListItem>
        ))}
      </List>

      <Pagination
        count={Math.ceil(filteredLeads.length / leadsPerPage)}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
        color="primary"
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default LeadsList;
